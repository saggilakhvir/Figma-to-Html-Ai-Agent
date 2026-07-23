import React from 'react';
import { Cpu, Settings, Key, Play, RefreshCw, Layers } from 'lucide-react';

const FigmaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" fill="currentColor"/>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" fill="currentColor"/>
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" fill="currentColor"/>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" fill="currentColor"/>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" fill="currentColor"/>
  </svg>
);

interface HeaderProps {
  status: 'IDLE' | 'EXECUTING' | 'COMPLETED' | 'ERROR';
  openaiKey: string;
  figmaToken: string;
  activeFileName: string;
  onOpenSettings: () => void;
  onTriggerAgent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  openaiKey,
  figmaToken,
  activeFileName,
  onOpenSettings,
  onTriggerAgent
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'EXECUTING':
        return (
          <span className="status-badge status-badge-executing pulse-glow">
            <Cpu size={12} className="icon-spin" />
            AGENT ACTIVE
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="status-badge status-badge-completed">
            <span className="status-dot dot-emerald animate-pulse-dot" />
            SYNTHESIS OK
          </span>
        );
      case 'ERROR':
        return (
          <span className="status-badge status-badge-error">
            <span className="status-dot dot-rose" />
            AGENT CRASH
          </span>
        );
      default:
        return (
          <span className="status-badge status-badge-standby">
            <span className="status-dot dot-slate" />
            STANDBY
          </span>
        );
    }
  };

  const isLiveOpenAi = openaiKey && openaiKey.trim().length > 0;
  const isLiveFigma = figmaToken && figmaToken.trim().length > 0;

  return (
    <header className="glass-panel header-container">
      {/* Brand Logo & Status */}
      <div className="brand-section">
        <div className="brand-logo-wrapper">
          <div className="brand-logo-icon">
            <Cpu className="icon-white" size={20} />
          </div>
          <div>
            <h1 className="brand-title">Antigravity</h1>
            <p className="brand-subtitle">Figma AI Agent Controller</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Center Details */}
      <div className="header-details-row">
        {/* Active Document Indicator */}
        <div className="detail-tag">
          <Layers size={14} className="icon-indigo" />
          <span className="detail-label">File:</span>
          <span className="detail-value">{activeFileName}</span>
        </div>

        {/* Credentials Status Tag */}
        <div className="detail-tag">
          <Key size={14} className={isLiveOpenAi ? "icon-cyan" : "icon-amber"} />
          <span className="detail-label">OpenAI:</span>
          <span className={`detail-value ${isLiveOpenAi ? "text-cyan" : "text-slate"}`}>
            {isLiveOpenAi ? "Live Connected" : "Sandbox"}
          </span>
        </div>

        <div className="detail-tag">
          <FigmaIcon size={14} className={isLiveFigma ? "icon-purple" : "icon-slate"} />
          <span className="detail-label">Figma REST:</span>
          <span className={`detail-value ${isLiveFigma ? "text-purple" : "text-slate"}`}>
            {isLiveFigma ? "Linked" : "Local Mock"}
          </span>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="action-buttons">
        <button
          onClick={onOpenSettings}
          className="settings-btn"
          title="Configure API Credentials"
        >
          <Settings size={18} />
        </button>

        <button
          onClick={onTriggerAgent}
          disabled={status === 'EXECUTING'}
          className={`run-btn ${status === 'EXECUTING' ? 'btn-disabled' : 'btn-active'}`}
        >
          {status === 'EXECUTING' ? (
            <>
              <RefreshCw size={15} className="icon-spin" />
              Synthesizing...
            </>
          ) : (
            <>
              <Play size={15} fill="currentColor" />
              Run AI Translation
            </>
          )}
        </button>
      </div>
    </header>
  );
};
