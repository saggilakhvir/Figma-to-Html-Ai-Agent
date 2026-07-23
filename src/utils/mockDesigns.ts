export interface FigmaNode {
  id: string;
  name: string;
  type: 'CANVAS' | 'FRAME' | 'TEXT' | 'RECTANGLE' | 'VECTOR' | 'GROUP';
  characters?: string;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER';
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  fills?: Array<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
    gradientHandlePositions?: any;
  }>;
  styles?: {
    [key: string]: string;
  };
  children?: FigmaNode[];
  style?: {
    fontSize?: number;
    fontWeight?: number;
    fontFamily?: string;
    lineHeightPx?: number;
    textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFY';
  };
}

export interface MockDesignFile {
  key: string;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  document: {
    id: string;
    name: string;
    type: 'DOCUMENT';
    children: FigmaNode[];
  };
  // Pre-compiled High-Fidelity Semantic HTML & CSS Output for Simulation
  compiledHtml: string;
  compiledCss: string;
  reasoningSteps: string[];
}

export const mockDesignFiles: MockDesignFile[] = [
  {
    key: "saas-landing-hero",
    name: "SaaS Landing Page (Hero & Features)",
    lastModified: "2026-07-23T14:22:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=60",
    document: {
      id: "0:1",
      name: "SaaS Landing Page",
      type: "DOCUMENT",
      children: [
        {
          id: "0:2",
          name: "Canvas",
          type: "CANVAS",
          children: [
            {
              id: "1:1",
              name: "SaaS Landing Container",
              type: "FRAME",
              absoluteBoundingBox: { x: 0, y: 0, width: 1440, height: 1024 },
              layoutMode: "VERTICAL",
              itemSpacing: 64,
              paddingTop: 0,
              paddingBottom: 80,
              paddingLeft: 120,
              paddingRight: 120,
              children: [
                {
                  id: "1:2",
                  name: "Header",
                  type: "FRAME",
                  absoluteBoundingBox: { x: 120, y: 0, width: 1200, height: 80 },
                  layoutMode: "HORIZONTAL",
                  primaryAxisAlignItems: "SPACE_BETWEEN",
                  counterAxisAlignItems: "CENTER",
                  children: [
                    {
                      id: "1:3",
                      name: "Logo Text",
                      type: "TEXT",
                      characters: "AuraAI",
                      style: { fontSize: 24, fontWeight: 800, fontFamily: "Outfit" }
                    },
                    {
                      id: "1:4",
                      name: "Navbar Links",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      itemSpacing: 32,
                      children: [
                        { id: "1:5", name: "Link Features", type: "TEXT", characters: "Features" },
                        { id: "1:6", name: "Link Integrations", type: "TEXT", characters: "Integrations" },
                        { id: "1:7", name: "Link Pricing", type: "TEXT", characters: "Pricing" },
                        { id: "1:8", name: "Link Docs", type: "TEXT", characters: "Docs" }
                      ]
                    },
                    {
                      id: "1:9",
                      name: "CTA Button Header",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      children: [
                        { id: "1:10", name: "CTA Text", type: "TEXT", characters: "Get Started" }
                      ]
                    }
                  ]
                },
                {
                  id: "2:1",
                  name: "Hero Section",
                  type: "FRAME",
                  absoluteBoundingBox: { x: 120, y: 144, width: 1200, height: 480 },
                  layoutMode: "VERTICAL",
                  primaryAxisAlignItems: "CENTER",
                  counterAxisAlignItems: "CENTER",
                  itemSpacing: 24,
                  children: [
                    {
                      id: "2:2",
                      name: "Badge",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      paddingLeft: 12,
                      paddingRight: 12,
                      paddingTop: 6,
                      paddingBottom: 6,
                      children: [
                        { id: "2:3", name: "Badge Text", type: "TEXT", characters: "✨ Introducing Aura v2.0" }
                      ]
                    },
                    {
                      id: "2:4",
                      name: "Main Heading",
                      type: "TEXT",
                      characters: "Build the Future with Agentic Design Automation",
                      style: { fontSize: 64, fontWeight: 900, fontFamily: "Outfit", textAlignHorizontal: "CENTER" }
                    },
                    {
                      id: "2:5",
                      name: "Sub Heading",
                      type: "TEXT",
                      characters: "Empower your team to compile Figma mockups into structured, semantic, and highly interactive frontend experiences instantly.",
                      style: { fontSize: 20, fontWeight: 400, fontFamily: "Outfit", textAlignHorizontal: "CENTER" }
                    },
                    {
                      id: "2:6",
                      name: "Hero Actions",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      itemSpacing: 16,
                      children: [
                        { id: "2:7", name: "Primary Button", type: "FRAME", children: [{ id: "2:8", name: "Btn Text", type: "TEXT", characters: "Start Free Trial" }] },
                        { id: "2:9", name: "Secondary Button", type: "FRAME", children: [{ id: "2:10", name: "Btn Text 2", type: "TEXT", characters: "Book Demo" }] }
                      ]
                    }
                  ]
                },
                {
                  id: "3:1",
                  name: "Features Grid",
                  type: "FRAME",
                  absoluteBoundingBox: { x: 120, y: 688, width: 1200, height: 300 },
                  layoutMode: "HORIZONTAL",
                  primaryAxisAlignItems: "SPACE_BETWEEN",
                  itemSpacing: 32,
                  children: [
                    {
                      id: "3:2",
                      name: "Card 1",
                      type: "FRAME",
                      layoutMode: "VERTICAL",
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 32,
                      paddingBottom: 32,
                      itemSpacing: 16,
                      children: [
                        { id: "3:3", name: "Icon 1", type: "VECTOR" },
                        { id: "3:4", name: "Title 1", type: "TEXT", characters: "Figma MCP Sync" },
                        { id: "3:5", name: "Desc 1", type: "TEXT", characters: "Connect direct tools to sync frames, inspect layout parameters, and auto-fetch typography." }
                      ]
                    },
                    {
                      id: "3:6",
                      name: "Card 2",
                      type: "FRAME",
                      layoutMode: "VERTICAL",
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 32,
                      paddingBottom: 32,
                      itemSpacing: 16,
                      children: [
                        { id: "3:7", name: "Icon 2", type: "VECTOR" },
                        { id: "3:8", name: "Title 2", type: "TEXT", characters: "Semantic Synthesizer" },
                        { id: "3:9", name: "Desc 2", type: "TEXT", characters: "Generated code conforms to WCAG AA accessibility specs, using nav, main, section, and article. No div soup." }
                      ]
                    },
                    {
                      id: "3:10",
                      name: "Card 3",
                      type: "FRAME",
                      layoutMode: "VERTICAL",
                      paddingLeft: 24,
                      paddingRight: 24,
                      paddingTop: 32,
                      paddingBottom: 32,
                      itemSpacing: 16,
                      children: [
                        { id: "3:11", name: "Icon 3", type: "VECTOR" },
                        { id: "3:12", name: "Title 3", type: "TEXT", characters: "Responsive Styles" },
                        { id: "3:13", name: "Desc 3", type: "TEXT", characters: "Adaptive layouts using CSS Grid and Flexbox that adapt cleanly across mobile, tablet, and widescreen viewports." }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    compiledHtml: `<!-- Semantic HTML Output -->
<header class="main-header">
  <div class="logo">
    <span class="logo-dot"></span>
    AuraAI
  </div>
  <nav class="nav-menu" aria-label="Main Navigation">
    <ul class="nav-list">
      <li><a href="#features" class="nav-link">Features</a></li>
      <li><a href="#integrations" class="nav-link">Integrations</a></li>
      <li><a href="#pricing" class="nav-link">Pricing</a></li>
      <li><a href="#docs" class="nav-link">Docs</a></li>
    </ul>
  </nav>
  <div class="header-actions">
    <button class="btn btn-secondary">Login</button>
    <button class="btn btn-primary btn-glow">Get Started</button>
  </div>
</header>

<main id="main-content">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-badge">
      <span class="badge-shine"></span>
      ✨ Introducing Aura v2.0
    </div>
    <h1 id="hero-title" class="hero-heading">
      Build the Future with <span class="gradient-text">Agentic Design</span> Automation
    </h1>
    <p class="hero-subtext">
      Empower your team to compile Figma mockups into structured, semantic, and highly interactive frontend experiences instantly.
    </p>
    <div class="hero-cta-group">
      <button class="btn btn-primary btn-lg btn-glow">Start Free Trial</button>
      <button class="btn btn-outline btn-lg">
        <svg class="play-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        Book Demo
      </button>
    </div>
  </section>

  <section id="features" class="features-section" aria-labelledby="features-title">
    <h2 id="features-title" class="sr-only">Product Features</h2>
    <div class="features-grid">
      <article class="feature-card">
        <div class="card-glow"></div>
        <div class="feature-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h3 class="feature-title">Figma MCP Sync</h3>
        <p class="feature-desc">
          Connect direct tools to sync frames, inspect layout parameters, and auto-fetch typography styles directly from your canvas.
        </p>
      </article>

      <article class="feature-card">
        <div class="card-glow"></div>
        <div class="feature-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h3 class="feature-title">Semantic Synthesizer</h3>
        <p class="feature-desc">
          Generated code conforms to WCAG AA accessibility specs, using nav, main, section, and article landmarks. No div soup.
        </p>
      </article>

      <article class="feature-card">
        <div class="card-glow"></div>
        <div class="feature-icon-wrapper">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="feature-title">Responsive Styles</h3>
        <p class="feature-desc">
          Adaptive layouts using CSS Grid and Flexbox that adapt cleanly across mobile, tablet, and widescreen viewports.
        </p>
      </article>
    </div>
  </section>
</main>`,
    compiledCss: `/* High-fidelity CSS Styling for SaaS Landing */
:root {
  --font-family: 'Outfit', sans-serif;
  --bg-dark: #0a0b10;
  --text-main: #94a3b8;
  --text-bright: #f8fafc;
  --color-primary: #6366f1;
  --color-primary-glow: rgba(99, 102, 241, 0.4);
  --color-purple: #8b5cf6;
  --color-cyan: #06b6d4;
  --border-light: rgba(255, 255, 255, 0.08);
}

body {
  margin: 0;
  font-family: var(--font-family);
  background-color: var(--bg-dark);
  color: var(--text-main);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Header Styles */
.main-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
  background: rgba(10, 11, 16, 0.7);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-bright);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-dot {
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-cyan));
  border-radius: 50%;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 32px;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-bright);
}

/* Buttons */
.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-purple));
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--color-primary-glow);
}

.btn-secondary {
  background: transparent;
  color: var(--text-main);
}

.btn-secondary:hover {
  color: var(--text-bright);
  background: rgba(255, 255, 255, 0.04);
}

.btn-outline {
  background: transparent;
  color: var(--text-bright);
  border: 1px solid var(--border-light);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-lg {
  padding: 14px 28px;
  font-size: 16px;
}

/* Hero Section */
.hero {
  max-width: 800px;
  margin: 80px auto;
  text-align: center;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #a5b4fc;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.hero-heading {
  font-size: 56px;
  font-weight: 900;
  line-height: 1.15;
  color: var(--text-bright);
  margin-bottom: 24px;
  letter-spacing: -1.5px;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8, #c084fc, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtext {
  font-size: 18px;
  color: var(--text-main);
  max-width: 600px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-cta-group {
  display: flex;
  gap: 16px;
}

/* Features Grid */
.features-section {
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 24px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(255, 255, 255, 0.03);
}

.feature-icon-wrapper {
  width: 48px;
  height: 48px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #818cf8;
  margin-bottom: 20px;
}

.feature-title {
  color: var(--text-bright);
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.feature-desc {
  margin: 0;
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.6;
}

/* Screen readers helper */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nav-menu { display: none; }
  .features-grid { grid-template-columns: 1fr; }
  .hero-heading { font-size: 40px; }
  .hero-subtext { font-size: 16px; }
  .hero { margin: 40px auto; }
}
`,
    reasoningSteps: [
      "Initializing Figma MCP connection...",
      "Tool call: `figma_list_files()` -> retrieved list of workspace frames.",
      "Tool call: `figma_get_file('saas-landing-hero')` -> fetched node layout schema.",
      "Identified main frame 'SaaS Landing Container' width=1440, height=1024, layoutMode=VERTICAL.",
      "Parsed Header: layoutMode=HORIZONTAL with primaryAxisAlignItems=SPACE_BETWEEN. Child nodes contain Logo (Text), NavLinks (Group) and CTA button. Compiling semantic `<header>` and `<nav>` structure.",
      "Parsed Hero: vertical stack with centered items, heading fontSize=64px. Mapping to `<main>` and landmark `<section aria-labelledby='hero-title'>`.",
      "Parsed Feature Grid: horizontal row containing three cards. Grouping them inside `<article>` tags for optimal assistive technology indexation.",
      "Synthesizing accessibility audit: checking landmarks, color contrasts on text labels, button labels, and ARIA relationships.",
      "Verifying stylesheet compile. Injecting css variables, hover states, linear animations and responsive media-query breakpoints."
    ]
  },
  {
    key: "analytics-dashboard",
    name: "Analytics Admin Dashboard",
    lastModified: "2026-07-23T10:15:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
    document: {
      id: "10:1",
      name: "Analytics Admin Dashboard",
      type: "DOCUMENT",
      children: [
        {
          id: "10:2",
          name: "Main Canvas",
          type: "CANVAS",
          children: [
            {
              id: "11:1",
              name: "Dashboard Shell",
              type: "FRAME",
              absoluteBoundingBox: { x: 0, y: 0, width: 1440, height: 900 },
              layoutMode: "HORIZONTAL",
              children: [
                {
                  id: "11:2",
                  name: "Sidebar Navigation",
                  type: "FRAME",
                  absoluteBoundingBox: { x: 0, y: 0, width: 260, height: 900 },
                  layoutMode: "VERTICAL",
                  paddingTop: 32,
                  paddingBottom: 32,
                  paddingLeft: 24,
                  paddingRight: 24,
                  children: [
                    { id: "11:3", name: "Brand Logo", type: "TEXT", characters: "ApexDash" },
                    {
                      id: "11:4",
                      name: "Nav Items Menu",
                      type: "FRAME",
                      layoutMode: "VERTICAL",
                      itemSpacing: 8,
                      children: [
                        { id: "11:5", name: "Nav Item Overview", type: "TEXT", characters: "Overview" },
                        { id: "11:6", name: "Nav Item Metrics", type: "TEXT", characters: "Metrics" },
                        { id: "11:7", name: "Nav Item Users", type: "TEXT", characters: "Users" },
                        { id: "11:8", name: "Nav Item Settings", type: "TEXT", characters: "Settings" }
                      ]
                    }
                  ]
                },
                {
                  id: "12:1",
                  name: "Content Space",
                  type: "FRAME",
                  absoluteBoundingBox: { x: 260, y: 0, width: 1180, height: 900 },
                  layoutMode: "VERTICAL",
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingTop: 32,
                  paddingBottom: 40,
                  itemSpacing: 32,
                  children: [
                    {
                      id: "12:2",
                      name: "Dashboard Header",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      primaryAxisAlignItems: "SPACE_BETWEEN",
                      children: [
                        { id: "12:3", name: "Section Title", type: "TEXT", characters: "Performance Summary" },
                        { id: "12:4", name: "User Status Block", type: "FRAME" }
                      ]
                    },
                    {
                      id: "12:5",
                      name: "KPI Cards Container",
                      type: "FRAME",
                      layoutMode: "HORIZONTAL",
                      itemSpacing: 24,
                      children: [
                        { id: "12:6", name: "Sales KPI Card", type: "FRAME" },
                        { id: "12:7", name: "Sessions KPI Card", type: "FRAME" },
                        { id: "12:8", name: "Bounce KPI Card", type: "FRAME" }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    compiledHtml: `<!-- Semantic HTML Output -->
<div class="dashboard-shell">
  <aside class="sidebar" aria-label="Sidebar Navigation">
    <div class="sidebar-brand">
      <div class="brand-icon">A</div>
      ApexDash
    </div>
    <nav class="sidebar-nav">
      <ul class="nav-links">
        <li>
          <a href="#" class="nav-item active">
            <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
            Overview
          </a>
        </li>
        <li>
          <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            Metrics
          </a>
        </li>
        <li>
          <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
            Users
          </a>
        </li>
        <li>
          <a href="#" class="nav-item">
            <svg class="nav-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
            Settings
          </a>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <div class="user-avatar">JD</div>
      <div class="user-info">
        <span class="user-name">John Doe</span>
        <span class="user-role">Administrator</span>
      </div>
    </div>
  </aside>

  <main class="dashboard-main" id="main-content">
    <header class="dashboard-header">
      <h1 class="header-title">Performance Summary</h1>
      <div class="header-controls">
        <div class="search-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="search" placeholder="Search report metrics..." aria-label="Search reports">
        </div>
        <button class="btn-icon-only" aria-label="Notifications">
          <span class="badge"></span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </button>
      </div>
    </header>

    <div class="kpi-grid">
      <article class="kpi-card">
        <div class="kpi-meta">
          <span class="kpi-label">Weekly Net Sales</span>
          <span class="trend trend-up">
            +12.4%
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
        <div class="kpi-value">$84,250.00</div>
        <div class="kpi-chart-progress">
          <div class="kpi-progress-bar" style="width: 76%"></div>
        </div>
      </article>

      <article class="kpi-card">
        <div class="kpi-meta">
          <span class="kpi-label">Active Session Rate</span>
          <span class="trend trend-up">
            +4.8%
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </span>
        </div>
        <div class="kpi-value">2,852 / min</div>
        <div class="kpi-chart-progress">
          <div class="kpi-progress-bar" style="width: 48%"></div>
        </div>
      </article>

      <article class="kpi-card">
        <div class="kpi-meta">
          <span class="kpi-label">Average Bounce Rate</span>
          <span class="trend trend-down">
            -2.1%
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </span>
        </div>
        <div class="kpi-value">38.45%</div>
        <div class="kpi-chart-progress">
          <div class="kpi-progress-bar" style="width: 32%"></div>
        </div>
      </article>
    </div>

    <section class="table-section" aria-labelledby="table-title">
      <h2 id="table-title" class="section-subtitle">Recent Operations</h2>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Endpoint ID</th>
              <th scope="col">Task Scope</th>
              <th scope="col">Performance Tag</th>
              <th scope="col">Sync Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="font-mono">api.v1.auth-controller</th>
              <td>Token Validation Loop</td>
              <td class="text-green">0.45 ms</td>
              <td><span class="status-badge active-tag">Operational</span></td>
            </tr>
            <tr>
              <th scope="row" class="font-mono">db.replica-connector</th>
              <td>Replication Sync Status</td>
              <td class="text-green">1.82 ms</td>
              <td><span class="status-badge active-tag">Operational</span></td>
            </tr>
            <tr>
              <th scope="row" class="font-mono">mcp.figma-client-node</th>
              <td>Canvas Node Serializer</td>
              <td class="text-amber">112.50 ms</td>
              <td><span class="status-badge warning-tag">Degraded</span></td>
            </tr>
            <tr>
              <th scope="row" class="font-mono">openai.chat-completions</th>
              <td>CSS Output Synthesis</td>
              <td class="text-rose">890.12 ms</td>
              <td><span class="status-badge active-tag">Operational</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</div>`,
    compiledCss: `/* CSS for Analytics Dashboard Shell */
:root {
  --sidebar-w: 260px;
  --bg-main: #090a0f;
  --bg-sidebar: #0f111a;
  --bg-card: #151722;
  --text-main: #94a3b8;
  --text-bright: #f8fafc;
  --border-subtle: rgba(255, 255, 255, 0.06);
  --color-blue: #3b82f6;
  --color-green: #10b981;
  --color-amber: #f59e0b;
  --color-rose: #ef4444;
}

body {
  margin: 0;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: 'Outfit', sans-serif;
}

.dashboard-shell {
  display: flex;
  min-height: 100vh;
}

/* Sidebar styling */
.sidebar {
  width: var(--sidebar-w);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-brand {
  padding: 32px 24px;
  font-size: 20px;
  font-weight: 800;
  color: var(--text-bright);
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--color-blue), #8b5cf6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
}

.sidebar-nav {
  flex-grow: 1;
  padding: 0 16px;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-main);
  text-decoration: none;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-bright);
}

.nav-item.active {
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.nav-icon {
  opacity: 0.7;
}

.nav-item.active .nav-icon {
  color: #60a5fa;
  opacity: 1;
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-bright);
  font-weight: 600;
  font-size: 14px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  color: var(--text-bright);
  font-weight: 600;
  font-size: 14px;
}

.user-role {
  font-size: 11px;
  color: #64748b;
}

/* Dashboard Content */
.dashboard-main {
  flex-grow: 1;
  padding: 40px;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-bright);
  margin: 0;
}

.header-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-box {
  background: #11131c;
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 280px;
}

.search-box input {
  background: transparent;
  border: none;
  color: var(--text-bright);
  font-family: inherit;
  font-size: 14px;
  width: 100%;
}

.search-box input:focus {
  outline: none;
}

.btn-icon-only {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  background: #11131c;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn-icon-only:hover {
  color: var(--text-bright);
  border-color: rgba(255, 255, 255, 0.15);
}

.btn-icon-only .badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  background-color: var(--color-rose);
  border-radius: 50%;
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.kpi-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
}

.kpi-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.kpi-label {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
}

.trend {
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
}

.trend-up {
  color: var(--color-green);
  background: rgba(16, 185, 129, 0.1);
}

.trend-down {
  color: var(--color-rose);
  background: rgba(239, 68, 68, 0.1);
}

.kpi-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-bright);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.kpi-chart-progress {
  height: 6px;
  background: #1f2231;
  border-radius: 3px;
  overflow: hidden;
}

.kpi-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-blue), #8b5cf6);
  border-radius: 3px;
}

/* Table styling */
.table-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-subtitle {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-bright);
}

.table-wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.data-table th, .data-table td {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.data-table thead th {
  background: #11131c;
  color: #64748b;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table tbody tr:last-child td,
.data-table tbody tr:last-child th {
  border-bottom: none;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-bright);
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.active-tag {
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-green);
}

.warning-tag {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-amber);
}

.text-green { color: var(--color-green); font-family: monospace; }
.text-amber { color: var(--color-amber); font-family: monospace; }
.text-rose { color: var(--color-rose); font-family: monospace; }

/* Responsive Dashboard layout */
@media (max-width: 992px) {
  .sidebar { width: 80px; }
  .sidebar-brand span, .user-info, .nav-item { display: none; }
  .kpi-grid { grid-template-columns: 1fr; }
}
`,
    reasoningSteps: [
      "Initializing Figma MCP interface...",
      "Tool call: `figma_list_files()` -> retrieved list of workspace frames.",
      "Tool call: `figma_get_file('analytics-dashboard')` -> loaded dashboard document canvas JSON.",
      "Detected main frame 'Dashboard Shell' width=1440, height=900, layoutMode=HORIZONTAL. The outer block will be implemented as a layout shell with sidebar and content main landmarks.",
      "Inspected Sidebar Navigation frame: width=260, layoutMode=VERTICAL. Recreating navigation block using semantic `<aside>` containing standard list tags `<ul>` and `<li>`.",
      "Inspected Content Space: nested column frame. Translating header nodes to a `<header>` element inside `<main>`.",
      "Analyzed KPI Cards Container: three layout nodes with dynamic stat titles. Coding cards as `<article>` elements for screen reader readability.",
      "Detected Operations table layout. Generating highly structured tabular output with `<table>`, `<thead>`, `<tbody>`, `<tr>`, and proper `scope='col'` and `scope='row'` semantic headers.",
      "Applying dark dashboard color system: establishing rich blue primary highlights, emerald operational signals, and custom progress indicators."
    ]
  },
  {
    key: "minimal-contact-form",
    name: "Minimal Contact Request Form",
    lastModified: "2026-07-22T08:30:00Z",
    thumbnailUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&auto=format&fit=crop&q=60",
    document: {
      id: "20:1",
      name: "Minimal Contact Form Document",
      type: "DOCUMENT",
      children: [
        {
          id: "20:2",
          name: "Main Frame",
          type: "CANVAS",
          children: [
            {
              id: "21:1",
              name: "Form Container Card",
              type: "FRAME",
              absoluteBoundingBox: { x: 420, y: 150, width: 600, height: 600 },
              layoutMode: "VERTICAL",
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 48,
              paddingBottom: 48,
              itemSpacing: 24,
              children: [
                { id: "21:2", name: "Form Title", type: "TEXT", characters: "Get in Touch" },
                { id: "21:3", name: "Form Subtext", type: "TEXT", characters: "Send a message and our support team will return a ping within 2 hours." },
                {
                  id: "21:4",
                  name: "Form FormElement",
                  type: "FRAME",
                  layoutMode: "VERTICAL",
                  itemSpacing: 16,
                  children: [
                    { id: "21:5", name: "Label Name", type: "TEXT", characters: "Full Name" },
                    { id: "21:6", name: "Input Name", type: "FRAME" },
                    { id: "21:7", name: "Label Email", type: "TEXT", characters: "Work Email" },
                    { id: "21:8", name: "Input Email", type: "FRAME" },
                    { id: "21:9", name: "Label Message", type: "TEXT", characters: "Your Message" },
                    { id: "21:10", name: "Input Message", type: "FRAME" }
                  ]
                },
                { id: "21:11", name: "Submit Button", type: "FRAME", children: [{ id: "21:12", name: "Submit Text", type: "TEXT", characters: "Send Message" }] }
              ]
            }
          ]
        }
      ]
    },
    compiledHtml: `<!-- Semantic HTML Output -->
<section class="form-container" aria-labelledby="form-title">
  <div class="form-header">
    <h1 id="form-title" class="form-title">Get in Touch</h1>
    <p class="form-description">
      Send a message and our support team will return a ping within 2 hours.
    </p>
  </div>

  <form id="contact-form" class="contact-form" novalidate>
    <div class="form-group">
      <label for="full-name" class="form-label">Full Name</label>
      <div class="input-wrapper">
        <input 
          type="text" 
          id="full-name" 
          name="fullName" 
          class="form-input" 
          placeholder="e.g. Alex Rivera" 
          required 
          autocomplete="name"
        >
        <span class="error-msg" id="name-error" aria-live="polite"></span>
      </div>
    </div>

    <div class="form-group">
      <label for="work-email" class="form-label">Work Email</label>
      <div class="input-wrapper">
        <input 
          type="email" 
          id="work-email" 
          name="email" 
          class="form-input" 
          placeholder="alex@company.com" 
          required 
          autocomplete="email"
        >
        <span class="error-msg" id="email-error" aria-live="polite"></span>
      </div>
    </div>

    <div class="form-group">
      <label for="topic-select" class="form-label">Reason for Contact</label>
      <div class="input-wrapper">
        <select id="topic-select" name="topic" class="form-select" required>
          <option value="" disabled selected>Select an option...</option>
          <option value="sales">Product Sales Inquiry</option>
          <option value="support">Technical Integration Help</option>
          <option value="billing">Billing & Account Issues</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label for="message-input" class="form-label">Your Message</label>
      <div class="input-wrapper">
        <textarea 
          id="message-input" 
          name="message" 
          class="form-textarea" 
          rows="4" 
          placeholder="Tell us what you're working on..." 
          required
        ></textarea>
        <span class="error-msg" id="message-error" aria-live="polite"></span>
      </div>
    </div>

    <div class="form-checkbox-group">
      <input type="checkbox" id="privacy-agreement" name="agree" class="form-checkbox" required>
      <label for="privacy-agreement" class="checkbox-label">
        I accept the privacy policy agreement conditions.
      </label>
    </div>

    <button type="submit" class="btn-submit btn-glow">
      Send Message
      <svg class="send-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    </button>
  </form>
</section>`,
    compiledCss: `/* CSS Styling for Minimal Contact Form */
:root {
  --bg-card-rgb: 21, 23, 34;
  --bg-dark: #090a0f;
  --text-main: #94a3b8;
  --text-bright: #f8fafc;
  --color-purple: #8b5cf6;
  --color-pink: #d946ef;
  --color-border: rgba(255, 255, 255, 0.08);
  --font-sans: 'Outfit', sans-serif;
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--bg-dark);
  font-family: var(--font-sans);
  color: var(--text-main);
  padding: 24px;
  box-sizing: border-box;
}

.form-container {
  background: rgb(var(--bg-card-rgb));
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 48px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-bright);
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.form-description {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-main);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-bright);
}

.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.form-input, .form-select, .form-textarea {
  background: #11131c;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 14px;
  color: var(--text-bright);
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.form-input::placeholder, .form-textarea::placeholder {
  color: #475569;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--color-purple);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}

.form-textarea {
  resize: vertical;
}

.form-checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 8px;
}

.form-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--color-purple);
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2px;
}

.checkbox-label {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-main);
  cursor: pointer;
}

.btn-submit {
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, var(--color-purple), var(--color-pink));
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 12px;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.35);
}

.send-icon {
  transition: transform 0.2s ease;
}

.btn-submit:hover .send-icon {
  transform: translate(2px, -2px);
}

.error-msg {
  color: #f43f5e;
  font-size: 12px;
  margin-top: 4px;
}
`
    ,
    reasoningSteps: [
      "Connecting to Figma REST client...",
      "Tool call: `figma_list_files()` -> retrieved files list.",
      "Tool call: `figma_get_file('minimal-contact-form')` -> decoded node list schema.",
      "Found main frame 'Form Container Card' width=600, height=600, positioned central on canvas. Layout mode is VERTICAL.",
      "Inspected form inputs: detected Label Name & Input Name grouping, Label Email & Input Email grouping, and Label Message & Input Message grouping.",
      "Generating standard semantic `<form>` shell with appropriate accessibility landmarks. Associating form inputs with corresponding `<label>` elements using explicit `for` attributes.",
      "Optimizing tags: applying `<textarea>` for message inputs, `<input type='email'>` for emails, and mapping checkbox elements cleanly.",
      "Validating access rules: verified labels mapping, focus states, interactive borders, error status spaces, and keyboard navigability.",
      "Synthesizing styling: adding standard transition parameters, custom focus rings, linear gradients, and responsive sizing bounds."
    ]
  }
];
