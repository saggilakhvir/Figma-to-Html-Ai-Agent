import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FigmaSimulator } from './components/FigmaSimulator';
import { AgentConsole } from './components/AgentConsole';
import { PreviewPanel } from './components/PreviewPanel';
import { ApiKeySettings } from './components/ApiKeySettings';
import { FigmaMcpService } from './services/figmaMcp';
import type { MCPToolLog } from './services/figmaMcp';
import { OpenAiService } from './services/openai';
import type { AgentResult } from './services/openai';
import type { FigmaNode } from './utils/mockDesigns';

export default function App() {
  // Credentials loaded from localStorage
  const [openaiKey, setOpenaiKey] = useState<string>(() => localStorage.getItem('aura_openai_key') || '');
  const [apiBase, setApiBase] = useState<string>(() => localStorage.getItem('aura_api_base') || 'https://api.openai.com/v1');
  const [figmaToken, setFigmaToken] = useState<string>(() => localStorage.getItem('aura_figma_token') || '');

  // File states
  const [files, setFiles] = useState<Array<{ key: string; name: string; thumbnailUrl: string }>>([]);
  const [activeFileKey, setActiveFileKey] = useState<string>('saas-landing-hero');
  const [rootNode, setRootNode] = useState<FigmaNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<FigmaNode | null>(null);
  const [liveFileKeyInput, setLiveFileKeyInput] = useState<string>('');
  const [isLiveLoading, setIsLiveLoading] = useState(false);

  // Agent parameters and logs
  const [status, setStatus] = useState<'IDLE' | 'EXECUTING' | 'COMPLETED' | 'ERROR'>('IDLE');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');
  const [temperature, setTemperature] = useState<number>(0.2);
  const [logs, setLogs] = useState<string[]>([]);
  const [mcpLogs, setMcpLogs] = useState<MCPToolLog[]>([]);
  const [agentResult, setAgentResult] = useState<AgentResult | null>(null);

  // Modal open
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load files catalogue on mount or key changes
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const fileCatalog = await FigmaMcpService.figmaListFiles(figmaToken);
        setFiles(fileCatalog);
      } catch (err) {
        console.error("Failed to load files catalog:", err);
      }
    };
    fetchCatalog();
  }, [figmaToken]);

  // Load file details when active file changes
  useEffect(() => {
    if (activeFileKey === 'custom-live-file') {
      setRootNode(null);
      setSelectedNode(null);
      return;
    }

    const loadFileContent = async () => {
      // Clear logs specific to new file loading
      setMcpLogs([]);
      try {
        const fileData = await FigmaMcpService.figmaGetFile(
          activeFileKey,
          figmaToken,
          (newLog) => setMcpLogs(prev => [newLog, ...prev])
        );

        if (fileData && fileData.document) {
          setRootNode(fileData.document);
          // Auto-select canvas or top-level element
          if (fileData.document.children && fileData.document.children.length > 0) {
            setSelectedNode(fileData.document.children[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load file contents:", err);
      }
    };

    loadFileContent();
  }, [activeFileKey, figmaToken]);

  // Credentials change save
  const handleSaveCredentials = (newOpenaiKey: string, newApiBase: string, newFigmaToken: string) => {
    setOpenaiKey(newOpenaiKey);
    setApiBase(newApiBase);
    setFigmaToken(newFigmaToken);
    localStorage.setItem('aura_openai_key', newOpenaiKey);
    localStorage.setItem('aura_api_base', newApiBase);
    localStorage.setItem('aura_figma_token', newFigmaToken);
  };

  // Run Real/Mock AI translate loop
  const handleTriggerAgent = async () => {
    if (status === 'EXECUTING') return;

    setStatus('EXECUTING');
    setLogs([]);
    setAgentResult(null);

    // Capture standard tool logging during agent process
    const loggedSteps: string[] = [];
    const pushStep = (text: string) => {
      loggedSteps.push(text);
      setLogs([...loggedSteps]);
    };

    try {
      // Setup Figma MCP tool calls logging callback
      const wrapLog = (logItem: MCPToolLog) => {
        setMcpLogs(prev => [logItem, ...prev]);
      };

      // 1. Fetch live nodes if live sync is active
      let targetNodeTree = rootNode;
      if (figmaToken && activeFileKey !== 'custom-live-file' && rootNode) {
        pushStep("MCP Tool Call: figma_get_file() syncing live frames properties...");
        const remoteFile = await FigmaMcpService.figmaGetFile(activeFileKey, figmaToken, wrapLog);
        targetNodeTree = remoteFile?.document || rootNode;
      }

      // 2. Fire openai synthesis translation
      const result = await OpenAiService.translateFigmaToHtml(
        {
          fileKey: activeFileKey,
          figmaNodeTree: targetNodeTree,
          openaiKey: openaiKey,
          apiBase: apiBase,
          modelName: selectedModel,
          temperature: temperature
        },
        (stepText) => {
          pushStep(stepText);
        }
      );

      setAgentResult(result);
      setStatus('COMPLETED');
      pushStep("Agent Synthesis Loop: Output compiled successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus('ERROR');
      pushStep(`Error: Translation loop crashed. ${err.message || String(err)}`);
    }
  };

  // Live file sync handler
  const handleLoadLiveFile = async () => {
    if (!liveFileKeyInput.trim() || !figmaToken) return;

    setIsLiveLoading(true);
    setMcpLogs([]);
    setSelectedNode(null);

    // Extract File Key from URL if present
    // Format: figma.com/file/KEY_HERE/... or figma.com/design/KEY_HERE/...
    let fileKey = liveFileKeyInput.trim();
    const urlPattern = /figma\.com\/(?:file|design|board)\/([a-zA-Z0-9]+)/;
    const match = fileKey.match(urlPattern);
    if (match && match[1]) {
      fileKey = match[1];
    }

    try {
      const data = await FigmaMcpService.figmaGetFile(
        fileKey,
        figmaToken,
        (newLog) => setMcpLogs(prev => [newLog, ...prev])
      );

      if (data && data.document) {
        setRootNode(data.document);
        if (data.document.children && data.document.children.length > 0) {
          setSelectedNode(data.document.children[0]);
        }
        // Force replace dummy file indicators with key name
        setActiveFileKey(fileKey);
        setFiles(prev => {
          if (prev.some(f => f.key === fileKey)) return prev;
          return [...prev, {
            key: fileKey,
            name: `${data.name || 'Live Project'} (Synced)`,
            thumbnailUrl: ''
          }];
        });
      }
    } catch (err: any) {
      alert(`Failed to load live Figma document. Check token validity or file permission constraints. Error: ${err.message}`);
    } finally {
      setIsLiveLoading(false);
    }
  };

  const getActiveFileName = () => {
    const fileItem = files.find(f => f.key === activeFileKey);
    return fileItem ? fileItem.name : activeFileKey === 'custom-live-file' ? 'Unsynced Canvas' : activeFileKey;
  };

  return (
    <div className="app-dashboard-wrapper">
      <div className="dashboard-content-container">
        {/* Core Header info */}
        <Header
          status={status}
          openaiKey={openaiKey}
          figmaToken={figmaToken}
          activeFileName={getActiveFileName()}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onTriggerAgent={handleTriggerAgent}
        />

        {/* Dashboard 3-Column Panels Layout */}
        <main className="dashboard-layout-grid" aria-label="Aura Dashboard Layout">
          <section className="dashboard-column" aria-label="Figma Canvas">
            <FigmaSimulator
              files={files}
              activeFileKey={activeFileKey}
              onFileSelect={setActiveFileKey}
              rootNode={rootNode}
              mcpLogs={mcpLogs}
              onNodeSelect={setSelectedNode}
              selectedNode={selectedNode}
              liveFileKeyInput={liveFileKeyInput}
              onLiveFileKeyChange={setLiveFileKeyInput}
              onLoadLiveFile={handleLoadLiveFile}
              isLiveLoading={isLiveLoading}
            />
          </section>

          <section className="dashboard-column" aria-label="Agent Logs">
            <AgentConsole
              logs={logs}
              status={status}
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              temperature={temperature}
              onTemperatureChange={setTemperature}
              metrics={agentResult ? agentResult.metrics : null}
            />
          </section>

          <section className="dashboard-column col-span-3-desktop" aria-label="Semantic HTML Code Output">
            <PreviewPanel result={agentResult} status={status} />
          </section>
        </main>
      </div>

      {/* API settings configuration panel */}
      <ApiKeySettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        openaiKey={openaiKey}
        apiBase={apiBase}
        figmaToken={figmaToken}
        onSave={handleSaveCredentials}
      />
    </div>
  );
}
