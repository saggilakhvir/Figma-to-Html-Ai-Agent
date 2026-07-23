import React, { useState } from 'react';
import { X, ShieldAlert, Key, Eye, EyeOff } from 'lucide-react';

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

interface ApiKeySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  openaiKey: string;
  apiBase: string;
  figmaToken: string;
  onSave: (openaiKey: string, apiBase: string, figmaToken: string) => void;
}

export const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({
  isOpen,
  onClose,
  openaiKey,
  apiBase,
  figmaToken,
  onSave
}) => {
  const [localOpenAiKey, setLocalOpenAiKey] = useState(openaiKey);
  const [localApiBase, setLocalApiBase] = useState(apiBase);
  const [localFigmaToken, setLocalFigmaToken] = useState(figmaToken);
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [showFigma, setShowFigma] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localOpenAiKey.trim(), localApiBase.trim(), localFigmaToken.trim());
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="glass-panel modal-card">
        {/* Modal Header */}
        <div className="modal-header-bar">
          <h2 className="modal-title flex-center gap-2">
            <Key size={18} className="icon-indigo" />
            API & Credentials Settings
          </h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Security Alert disclaimer */}
          <div className="security-alert-box flex-center gap-3">
            <ShieldAlert size={28} className="icon-amber flex-shrink-0" />
            <p className="alert-text">
              Credentials are saved strictly in your local browser storage (<code className="bg-amber-text">localStorage</code>) and are dispatched directly to the official OpenAI and Figma gateway endpoints.
            </p>
          </div>

          <div className="form-fields-stack">
            {/* OpenAI API Key Field */}
            <div className="form-field-group">
              <label className="field-label flex-center gap-2">
                <Key size={14} className="icon-cyan" />
                OpenAI API Key
              </label>
              <div className="textbox-wrapper">
                <input
                  type={showOpenAi ? "text" : "password"}
                  placeholder="sk-proj-..."
                  value={localOpenAiKey}
                  onChange={(e) => setLocalOpenAiKey(e.target.value)}
                  className="modal-textbox"
                />
                <button
                  type="button"
                  onClick={() => setShowOpenAi(!showOpenAi)}
                  className="reveal-pwd-btn"
                >
                  {showOpenAi ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <span className="field-hint">
                Leave blank to run in Sandbox Mode (uses mock completions fallback).
              </span>
            </div>

            {/* OpenAI Compatible API Base URL Field */}
            <div className="form-field-group">
              <label className="field-label flex-center gap-2">
                <Key size={14} className="icon-cyan" />
                API Base URL
              </label>
              <div className="textbox-wrapper">
                <input
                  type="text"
                  placeholder="https://api.openai.com/v1"
                  value={localApiBase}
                  onChange={(e) => setLocalApiBase(e.target.value)}
                  className="modal-textbox"
                />
              </div>
              <span className="field-hint">
                OpenAI-compatible base URL. Defaults to <code>https://api.openai.com/v1</code>.
              </span>
            </div>

            {/* Figma Token Field */}
            <div className="form-field-group">
              <label className="field-label flex-center gap-2">
                <FigmaIcon size={14} className="icon-purple" />
                Figma Personal Access Token
              </label>
              <div className="textbox-wrapper">
                <input
                  type={showFigma ? "text" : "password"}
                  placeholder="fig-..."
                  value={localFigmaToken}
                  onChange={(e) => setLocalFigmaToken(e.target.value)}
                  className="modal-textbox"
                />
                <button
                  type="button"
                  onClick={() => setShowFigma(!showFigma)}
                  className="reveal-pwd-btn"
                >
                  {showFigma ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <span className="field-hint">
                Required for Live mode. Leave blank to inspect mock design canvases locally.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer-bar">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-save btn-active">
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
