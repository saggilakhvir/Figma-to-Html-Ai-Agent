import React, { useState } from 'react';
import { Eye, Code, ShieldCheck, Laptop, Tablet, Smartphone, Copy, Check, Info } from 'lucide-react';
import type { AgentResult } from '../services/openai';

interface PreviewPanelProps {
  result: AgentResult | null;
  status: 'IDLE' | 'EXECUTING' | 'COMPLETED' | 'ERROR';
}

type PreviewTab = 'PREVIEW' | 'CODE' | 'A11Y';
type ViewportSize = 'DESKTOP' | 'TABLET' | 'MOBILE';

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ result, status }) => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('PREVIEW');
  const [viewport, setViewport] = useState<ViewportSize>('DESKTOP');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const getViewportWidth = () => {
    switch (viewport) {
      case 'MOBILE':
        return '375px';
      case 'TABLET':
        return '768px';
      default:
        return '100%';
    }
  };

  const handleCopy = (text: string, type: 'HTML' | 'CSS') => {
    navigator.clipboard.writeText(text);
    if (type === 'HTML') {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } else {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  // Compile full iframe srcDoc markup (inject HTML, CSS, and basic font link)
  const getIframeSrcDoc = () => {
    if (!result) return '';
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Load fonts standard to mock files -->
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap" rel="stylesheet">
        <style>
          ${result.css}
        </style>
      </head>
      <body>
        ${result.html}
      </body>
      </html>
    `;
  };

  // Basic regex syntax highlighting for HTML
  const highlightHtml = (code: string) => {
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tags
    escaped = escaped.replace(
      /(&lt;\/?[a-zA-Z1-6]+)(\s|&gt;)/g,
      '<span class="code-tag">$1</span>$2'
    );
    // Attributes
    escaped = escaped.replace(
      /(\s[a-zA-Z-]+)=/g,
      ' <span class="code-attr">$1</span>='
    );
    // Values
    escaped = escaped.replace(
      /(".*?")/g,
      '<span class="code-val">$1</span>'
    );
    // Comments
    escaped = escaped.replace(
      /(&lt;!--.*?--&gt;)/g,
      '<span class="code-comment">$1</span>'
    );

    return escaped;
  };

  // Basic regex syntax highlighting for CSS
  const highlightCss = (code: string) => {
    let escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Properties
    escaped = escaped.replace(
      /([a-zA-Z-]+)\s*:/g,
      '<span class="code-style-prop">$1</span>:'
    );
    // Values
    escaped = escaped.replace(
      /:\s*([^;]+);/g,
      ': <span class="code-style-val">$1</span>;'
    );
    // Comments
    escaped = escaped.replace(
      /(\/\*.*?\*\/)/g,
      '<span class="code-comment">$1</span>'
    );

    return escaped;
  };

  return (
    <div className="glass-panel preview-card">
      <div className="card-header-bar">
        <div className="tab-buttons-row">
          <button
            onClick={() => setActiveTab('PREVIEW')}
            className={`tab-toggle-btn ${activeTab === 'PREVIEW' ? 'tab-toggle-active' : ''}`}
          >
            <Eye size={13} className="mr-1 inline" /> Live Preview
          </button>
          <button
            onClick={() => setActiveTab('CODE')}
            className={`tab-toggle-btn ${activeTab === 'CODE' ? 'tab-toggle-active' : ''}`}
          >
            <Code size={13} className="mr-1 inline" /> Synthesized Code
          </button>
          <button
            onClick={() => setActiveTab('A11Y')}
            className={`tab-toggle-btn ${activeTab === 'A11Y' ? 'tab-toggle-active' : ''}`}
          >
            <ShieldCheck size={13} className="mr-1 inline" /> A11y Audit
          </button>
        </div>

        {/* Viewport size switcher (only in Preview tab) */}
        {activeTab === 'PREVIEW' && result && (
          <div className="viewport-switcher-row">
            <button
              onClick={() => setViewport('DESKTOP')}
              className={`viewport-btn ${viewport === 'DESKTOP' ? 'viewport-btn-active' : ''}`}
              title="Desktop 100%"
            >
              <Laptop size={14} />
            </button>
            <button
              onClick={() => setViewport('TABLET')}
              className={`viewport-btn ${viewport === 'TABLET' ? 'viewport-btn-active' : ''}`}
              title="Tablet 768px"
            >
              <Tablet size={14} />
            </button>
            <button
              onClick={() => setViewport('MOBILE')}
              className={`viewport-btn ${viewport === 'MOBILE' ? 'viewport-btn-active' : ''}`}
              title="Mobile 375px"
            >
              <Smartphone size={14} />
            </button>
          </div>
        )}
      </div>

      <div className="preview-body">
        {status === 'EXECUTING' && (
          <div className="synthesis-loading-state">
            <div className="loader-container">
              <div className="spinning-ring" />
              <div className="loading-core">AI</div>
            </div>
            <h3 className="loading-title">Synthesizing Semantic Code...</h3>
            <p className="loading-subtitle">Applying landmarks audit, auto-layout flex rules, and CSS variables variables.</p>
          </div>
        )}

        {status !== 'EXECUTING' && !result && (
          <div className="empty-preview-state">
            <Code size={40} className="icon-slate mb-3" />
            <h3>No Output Generated Yet</h3>
            <p>Select a mockup, configure parameters, and execute the controller agent to generate Semantic HTML output.</p>
          </div>
        )}

        {status !== 'EXECUTING' && result && (
          <>
            {/* Live Interactive Iframe Preview tab */}
            {activeTab === 'PREVIEW' && (
              <div className="live-preview-tab-wrapper">
                <div
                  className="iframe-viewport-outer"
                  style={{ width: getViewportWidth() }}
                >
                  <div className="viewport-header-status">
                    <span className="window-dots">
                      <span className="s-dot bg-red" />
                      <span className="s-dot bg-yellow" />
                      <span className="s-dot bg-green" />
                    </span>
                    <span className="viewport-size-label font-mono">
                      Viewport: {viewport === 'DESKTOP' ? 'Widescreen (100%)' : viewport === 'TABLET' ? 'Tablet (768px)' : 'Mobile (375px)'}
                    </span>
                  </div>
                  <iframe
                    title="Synthesized HTML Canvas Live Preview"
                    srcDoc={getIframeSrcDoc()}
                    className="live-preview-iframe"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}

            {/* Synthesized Code Viewer tab */}
            {activeTab === 'CODE' && (
              <div className="code-tab-wrapper">
                {/* HTML Panel */}
                <div className="code-split-box">
                  <div className="code-section-header">
                    <span className="code-title font-bold text-slate">index.html</span>
                    <button
                      onClick={() => handleCopy(result.html, 'HTML')}
                      className="copy-code-btn flex-center gap-1"
                    >
                      {copiedHtml ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                      {copiedHtml ? 'Copied' : 'Copy HTML'}
                    </button>
                  </div>
                  <pre className="code-scrollbar-box">
                    <code
                      className="font-mono text-sm"
                      dangerouslySetInnerHTML={{ __html: highlightHtml(result.html) }}
                    />
                  </pre>
                </div>

                {/* CSS Panel */}
                <div className="code-split-box">
                  <div className="code-section-header">
                    <span className="code-title font-bold text-slate">index.css</span>
                    <button
                      onClick={() => handleCopy(result.css, 'CSS')}
                      className="copy-code-btn flex-center gap-1"
                    >
                      {copiedCss ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                      {copiedCss ? 'Copied' : 'Copy CSS'}
                    </button>
                  </div>
                  <pre className="code-scrollbar-box">
                    <code
                      className="font-mono text-sm"
                      dangerouslySetInnerHTML={{ __html: highlightCss(result.css) }}
                    />
                  </pre>
                </div>
              </div>
            )}

            {/* Accessibility and Landmarking Audit tab */}
            {activeTab === 'A11Y' && (
              <div className="a11y-tab-wrapper">
                <div className="a11y-score-card">
                  <div className="a11y-score-circle">
                    <span className="score-number font-mono">{result.accessibilityReport.score}</span>
                    <span className="score-total">/100</span>
                  </div>
                  <div>
                    <h3 className="score-verdict">WCAG 2.1 Landmark Compliant</h3>
                    <p className="score-desc">
                      The generated markup features optimized accessibility landmarks. Top-level tags are mapped to screen reader friendly selectors.
                    </p>
                  </div>
                </div>

                <div className="a11y-lists-grid">
                  <div className="a11y-list-box positive-box">
                    <h4 className="a11y-list-header flex-center gap-1 text-emerald">
                      <ShieldCheck size={14} /> Passed Checks
                    </h4>
                    <ul className="a11y-bullet-list">
                      {result.accessibilityReport.positives.map((item, idx) => (
                        <li key={idx} className="a11y-bullet-item">
                          <span className="bullet-check text-emerald">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="a11y-list-box warning-box">
                    <h4 className="a11y-list-header flex-center gap-1 text-amber">
                      <Info size={14} /> Recommended Tweaks
                    </h4>
                    <ul className="a11y-bullet-list">
                      {result.accessibilityReport.improvements.map((item, idx) => (
                        <li key={idx} className="a11y-bullet-item">
                          <span className="bullet-warning text-amber">!</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
