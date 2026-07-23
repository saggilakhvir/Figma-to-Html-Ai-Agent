import React, { useRef, useEffect } from 'react';
import { Terminal, Cpu, Info, Sliders, DollarSign, Clock, Hash } from 'lucide-react';

interface AgentConsoleProps {
  logs: string[];
  status: 'IDLE' | 'EXECUTING' | 'COMPLETED' | 'ERROR';
  selectedModel: string;
  onModelChange: (model: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
  metrics: {
    durationMs: number;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
  } | null;
}

export const AgentConsole: React.FC<AgentConsoleProps> = ({
  logs,
  status,
  selectedModel,
  onModelChange,
  temperature,
  onTemperatureChange,
  metrics
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal logs to bottom on update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="glass-panel console-card scan-line-effect">
      <div className="card-header-bar">
        <h2 className="card-heading-title flex-center gap-2">
          <Terminal size={16} className="icon-indigo" />
          AI Agent Controller
        </h2>
      </div>

      <div className="console-body">
        {/* Model Configurations Bar */}
        <div className="console-config-section">
          <div className="config-grid">
            <div className="config-item">
              <label className="selector-label flex-center gap-1">
                <Sliders size={12} /> Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                disabled={status === 'EXECUTING'}
                className="console-select"
              >
                <option value="gpt-4o">gpt-4o (Premium)</option>
                <option value="gpt-4o-mini">gpt-4o-mini (Fast & Light)</option>
              </select>
            </div>

            <div className="config-item">
              <label className="selector-label">Temp: {temperature}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                disabled={status === 'EXECUTING'}
                className="console-slider"
              />
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="terminal-window">
          {/* Terminal Window Header */}
          <div className="terminal-header">
            <div className="window-controls">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="terminal-title">aura-agent-controller ~ node</span>
          </div>

          {/* Terminal Scrolling Log */}
          <div className="terminal-output-log">
            {logs.length === 0 ? (
              <div className="empty-terminal-state">
                <Cpu size={24} className="icon-slate mb-2" />
                <span>Agent idle. Press "Run AI Translation" to begin compile loop.</span>
              </div>
            ) : (
              logs.map((log, index) => {
                const isError = log.toLowerCase().includes('error') || log.toLowerCase().includes('fail') || log.toLowerCase().includes('crash');
                const isTool = log.includes('Tool call:') || log.includes('[Tool Call]');
                const isDone = log.includes('complete') || log.includes('Done!');
                
                let lineClass = 'terminal-line';
                if (isError) lineClass += ' text-rose';
                else if (isTool) lineClass += ' text-cyan';
                else if (isDone) lineClass += ' text-green';

                return (
                  <div key={index} className={lineClass}>
                    <span className="terminal-prompt">&gt;</span>
                    <span className="terminal-text">{log}</span>
                  </div>
                );
              })
            )}

            {/* Blinking Cursor if executing */}
            {status === 'EXECUTING' && (
              <div className="terminal-line text-indigo">
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-cursor" />
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Metrics Footer */}
        {metrics && status !== 'EXECUTING' && (
          <div className="metrics-panel border-top">
            <div className="metrics-title flex-center gap-1 text-slate uppercase font-bold tracking-wider">
              <Info size={12} /> Execution Metrics
            </div>
            <div className="metrics-grid">
              <div className="metric-badge">
                <Clock size={12} className="icon-indigo" />
                <span className="metric-lbl font-semibold">Latency:</span>
                <span className="metric-val font-mono">{metrics.durationMs}ms</span>
              </div>
              <div className="metric-badge">
                <Hash size={12} className="icon-cyan" />
                <span className="metric-lbl font-semibold">Tokens:</span>
                <span className="metric-val font-mono">
                  {metrics.inputTokens + metrics.outputTokens}
                </span>
              </div>
              <div className="metric-badge">
                <DollarSign size={12} className="icon-emerald" />
                <span className="metric-lbl font-semibold">Cost:</span>
                <span className="metric-val font-mono">${metrics.estimatedCost.toFixed(5)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
