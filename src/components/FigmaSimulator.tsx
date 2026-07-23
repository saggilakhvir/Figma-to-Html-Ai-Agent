import React, { useState } from 'react';
import { Folder, FileText, Square, Triangle, ChevronDown, ChevronRight, Search, Activity } from 'lucide-react';
import type { FigmaNode } from '../utils/mockDesigns';
import type { MCPToolLog } from '../services/figmaMcp';

interface FigmaSimulatorProps {
  files: Array<{ key: string; name: string; thumbnailUrl: string }>;
  activeFileKey: string;
  onFileSelect: (key: string) => void;
  rootNode: FigmaNode | null;
  mcpLogs: MCPToolLog[];
  onNodeSelect: (node: FigmaNode | null) => void;
  selectedNode: FigmaNode | null;
  liveFileKeyInput: string;
  onLiveFileKeyChange: (val: string) => void;
  onLoadLiveFile: () => void;
  isLiveLoading: boolean;
}

export const FigmaSimulator: React.FC<FigmaSimulatorProps> = ({
  files,
  activeFileKey,
  onFileSelect,
  rootNode,
  mcpLogs,
  onNodeSelect,
  selectedNode,
  liveFileKeyInput,
  onLiveFileKeyChange,
  onLoadLiveFile,
  isLiveLoading
}) => {
  const [activeTab, setActiveTab] = useState<'EXPLORER' | 'MCP_MONITOR'>('EXPLORER');
  const [expandedNodes, setExpandedNodes] = useState<{ [id: string]: boolean }>({ '0:2': true, '1:1': true });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderNodeIcon = (type: FigmaNode['type']) => {
    switch (type) {
      case 'CANVAS':
        return <Folder size={14} className="node-icon icon-cyan" />;
      case 'FRAME':
        return <Folder size={14} className="node-icon icon-indigo" />;
      case 'TEXT':
        return <FileText size={14} className="node-icon icon-amber" />;
      case 'RECTANGLE':
        return <Square size={14} className="node-icon icon-purple" />;
      default:
        return <Triangle size={14} className="node-icon icon-slate" />;
    }
  };

  const renderNodeTree = (node: FigmaNode, depth = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = selectedNode?.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="tree-node-wrapper">
        <div
          className={`tree-node-row ${isSelected ? 'node-selected' : ''}`}
          style={{ paddingLeft: `${depth * 14 + 6}px` }}
          onClick={() => onNodeSelect(node)}
        >
          {hasChildren ? (
            <button className="expand-arrow-btn" onClick={(e) => toggleExpand(node.id, e)}>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <span className="expand-spacer" />
          )}

          {renderNodeIcon(node.type)}
          <span className="node-name">{node.name}</span>
          {node.type === 'TEXT' && node.characters && (
            <span className="node-chars">"{node.characters.substring(0, 16)}{node.characters.length > 16 ? '...' : ''}"</span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="node-children-container">
            {node.children!.map((child) => renderNodeTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel simulator-card">
      <div className="card-header-bar">
        <h2 className="card-heading-title">Figma Canvas Simulator</h2>
        <div className="tab-buttons-row">
          <button
            onClick={() => setActiveTab('EXPLORER')}
            className={`tab-toggle-btn ${activeTab === 'EXPLORER' ? 'tab-toggle-active' : ''}`}
          >
            Canvas Explorer
          </button>
          <button
            onClick={() => setActiveTab('MCP_MONITOR')}
            className={`tab-toggle-btn ${activeTab === 'MCP_MONITOR' ? 'tab-toggle-active' : ''}`}
          >
            Figma MCP Logs
          </button>
        </div>
      </div>

      <div className="simulator-body">
        {/* Document Selection / Sync */}
        <div className="file-selector-section">
          <label className="selector-label">Mock Figma Files:</label>
          <select
            value={activeFileKey}
            onChange={(e) => {
              onFileSelect(e.target.value);
              onNodeSelect(null);
            }}
            className="file-dropdown-select"
          >
            {files.map((f) => (
              <option key={f.key} value={f.key}>
                {f.name}
              </option>
            ))}
            <option value="custom-live-file">-- Load Real Figma File URL --</option>
          </select>
        </div>

        {/* Live File Loader Input (Shown if custom live selected) */}
        {activeFileKey === 'custom-live-file' && (
          <div className="live-file-loader-row">
            <input
              type="text"
              placeholder="Enter Figma File Key / URL..."
              value={liveFileKeyInput}
              onChange={(e) => onLiveFileKeyChange(e.target.value)}
              className="live-key-textbox"
            />
            <button
              onClick={onLoadLiveFile}
              disabled={isLiveLoading || !liveFileKeyInput.trim()}
              className="sync-live-btn"
            >
              {isLiveLoading ? 'Loading...' : 'Sync REST API'}
            </button>
          </div>
        )}

        {/* Tabs Content */}
        {activeTab === 'EXPLORER' ? (
          <div className="explorer-tab-content">
            {/* Visual Canvas Mockup thumbnail */}
            <div className="canvas-thumbnail-wrapper">
              {files.find(f => f.key === activeFileKey)?.thumbnailUrl ? (
                <img
                  src={files.find(f => f.key === activeFileKey)?.thumbnailUrl}
                  alt="Figma mockup thumbnail"
                  className="canvas-thumbnail-image"
                />
              ) : (
                <div className="empty-canvas-fallback">
                  <Activity size={32} className="icon-purple pulse-glow" />
                  <span>Linked Active Figma REST API Stream</span>
                </div>
              )}
              <div className="canvas-badge">1440x1024px</div>
            </div>

            {/* Tree View */}
            <div className="tree-explorer-container">
              <h3 className="section-label-heading">Document Layers</h3>
              <div className="layers-tree-scrollbox">
                {rootNode ? (
                  renderNodeTree(rootNode)
                ) : (
                  <div className="empty-tree-state">No layers loaded. Click Sync to fetch nodes.</div>
                )}
              </div>
            </div>

            {/* Selection Inspector */}
            {selectedNode && (
              <div className="node-inspector-pane">
                <div className="inspector-title">Properties: {selectedNode.type}</div>
                <div className="properties-grid">
                  <div className="property-item">
                    <span className="prop-name">Name</span>
                    <span className="prop-val">{selectedNode.name}</span>
                  </div>
                  {selectedNode.absoluteBoundingBox && (
                    <>
                      <div className="property-item">
                        <span className="prop-name">Dimensions</span>
                        <span className="prop-val">
                          {Math.round(selectedNode.absoluteBoundingBox.width)} x {Math.round(selectedNode.absoluteBoundingBox.height)} px
                        </span>
                      </div>
                      <div className="property-item">
                        <span className="prop-name">Bounding Offset</span>
                        <span className="prop-val">
                          X: {Math.round(selectedNode.absoluteBoundingBox.x)}, Y: {Math.round(selectedNode.absoluteBoundingBox.y)}
                        </span>
                      </div>
                    </>
                  )}
                  {selectedNode.layoutMode && selectedNode.layoutMode !== 'NONE' && (
                    <>
                      <div className="property-item">
                        <span className="prop-name">Auto Layout</span>
                        <span className="prop-val">{selectedNode.layoutMode}</span>
                      </div>
                      <div className="property-item">
                        <span className="prop-name">Spacing / Padding</span>
                        <span className="prop-val">
                          Gap: {selectedNode.itemSpacing || 0}px / Pad: {selectedNode.paddingTop || 0}px
                        </span>
                      </div>
                    </>
                  )}
                  {selectedNode.style && (
                    <div className="property-item full-width-prop">
                      <span className="prop-name">Font Styles</span>
                      <span className="prop-val">
                        {selectedNode.style.fontSize}px {selectedNode.style.fontFamily} ({selectedNode.style.fontWeight})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* MCP Log Monitor tab */
          <div className="mcp-monitor-tab-content">
            <div className="mcp-logs-header">
              <span className="mcp-logs-title text-slate font-bold uppercase tracking-wider">Active Tools Calls Logs</span>
              <span className="tool-badge-count">{mcpLogs.length} calls</span>
            </div>
            <div className="mcp-logs-scrollbox">
              {mcpLogs.length === 0 ? (
                <div className="empty-logs-state">
                  <Search size={24} className="text-slate mb-2" />
                  <span>No MCP tool calls yet. Run AI Translation to trigger.</span>
                </div>
              ) : (
                mcpLogs.map((log, index) => (
                  <div key={index} className={`mcp-log-card border-left-${log.status.toLowerCase()}`}>
                    <div className="mcp-log-meta">
                      <span className="mcp-log-tool font-mono">{log.toolName}</span>
                      <span className={`mcp-log-status status-text-${log.status.toLowerCase()}`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="mcp-log-args font-mono">
                      <span className="text-slate">Args:</span> {JSON.stringify(log.arguments)}
                    </div>
                    {log.status === 'SUCCESS' && log.result && (
                      <div className="mcp-log-res font-mono">
                        <span className="text-slate">Result:</span> {JSON.stringify(log.result)}
                      </div>
                    )}
                    {log.status === 'ERROR' && log.error && (
                      <div className="mcp-log-err font-mono text-rose-400">
                        <span className="text-rose font-bold">Error:</span> {log.error}
                      </div>
                    )}
                    <span className="mcp-log-time">{log.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
