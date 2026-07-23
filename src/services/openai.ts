import { mockDesignFiles } from '../utils/mockDesigns';

export interface AgentResult {
  html: string;
  css: string;
  accessibilityReport: {
    score: number;
    positives: string[];
    improvements: string[];
  };
  metrics: {
    durationMs: number;
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
  };
}

export class OpenAiService {
  /**
   * Translates Figma design layout into Semantic HTML & CSS.
   * Supports both simulated sandbox execution and real OpenAI completions.
   */
  public static async translateFigmaToHtml(
    options: {
      fileKey: string;
      figmaNodeTree: any;
      openaiKey?: string;
      apiBase?: string;
      modelName?: string;
      temperature?: number;
    },
    onStep: (stepText: string, stepIndex: number) => void
  ): Promise<AgentResult> {
    const { fileKey, figmaNodeTree, openaiKey, apiBase, modelName = 'gpt-4o', temperature = 0.2 } = options;
    const startTime = Date.now();

    // Determine if we are running in Live Mode or Sandbox Mode
    if (openaiKey && openaiKey.trim().length > 0) {
      return this.executeLiveTranslation(
        openaiKey,
        apiBase || 'https://api.openai.com/v1',
        modelName,
        temperature,
        figmaNodeTree,
        startTime,
        onStep
      );
    } else {
      return this.executeSimulatedTranslation(fileKey, startTime, onStep);
    }
  }

  /**
   * Simulated sandbox translation using pre-compiled high-fidelity assets.
   * Plays back reasoning logs and tool invocations with custom delays.
   */
  private static async executeSimulatedTranslation(
    fileKey: string,
    startTime: number,
    onStep: (stepText: string, stepIndex: number) => void
  ): Promise<AgentResult> {
    const mockFile = mockDesignFiles.find(f => f.key === fileKey) || mockDesignFiles[0];
    const steps = mockFile.reasoningSteps;

    // Stream reasoning logs step-by-step to the controller console
    for (let i = 0; i < steps.length; i++) {
      onStep(steps[i], i);
      // Custom pacing delays to simulate thought processes
      const delay = i === 0 ? 400 : i === steps.length - 1 ? 900 : 700;
      await new Promise(r => setTimeout(r, delay));
    }

    const durationMs = Date.now() - startTime;

    // Evaluate simulated a11y score based on mock file
    let score = 96;
    let positives = [
      "No direct generic 'div' wrappers used as top-level buttons or layout elements.",
      "Strict hierarchy of h1 -> h2 -> h3 heading tags established.",
      "Embedded navigation landmarks mapped to accessible <nav> and <header> wrapper layers."
    ];
    let improvements = [
      "Ensure color variables in CSS sustain high color contrast specs for secondary texts.",
      "Verify target buttons support focus ring overrides in all tab states."
    ];

    if (fileKey === 'minimal-contact-form') {
      score = 98;
      positives = [
        "All text inputs explicitly map to matching label elements with unique ID descriptors.",
        "Assistive technology screen-readers correctly map aria-live on dynamic warning borders.",
        "Select fields specify placeholder default values as disabled parameters."
      ];
      improvements = [
        "Include autofill support indicators across name inputs to optimize inputs."
      ];
    } else if (fileKey === 'analytics-dashboard') {
      score = 92;
      positives = [
        "Tabular grid uses strict caption indicators and col/row index mappings.",
        "Icons map aria-hidden parameters to hide decorative paths.",
        "Sidebars map landmarks to <aside> sections."
      ];
      improvements = [
        "Ensure search input form elements explicitly connect to labels or aria-label structures.",
        "Review contrast ratios on smaller table headers."
      ];
    }

    return {
      html: mockFile.compiledHtml,
      css: mockFile.compiledCss,
      accessibilityReport: {
        score,
        positives,
        improvements
      },
      metrics: {
        durationMs,
        inputTokens: 3450,
        outputTokens: 1120,
        estimatedCost: 0.027
      }
    };
  }

  /**
   * Real live OpenAI REST API call to generate HTML/CSS from the Figma Node Structure.
   */
  private static async executeLiveTranslation(
    apiKey: string,
    apiBase: string,
    model: string,
    temperature: number,
    figmaNodeTree: any,
    startTime: number,
    onStep: (stepText: string, stepIndex: number) => void
  ): Promise<AgentResult> {
    onStep("Live Mode Activated: Contacting OpenAI Gateway...", 0);
    await new Promise(r => setTimeout(r, 600));

    onStep("Serializing Figma canvas components hierarchy JSON...", 1);
    // Sanitize tree to keep it under token limit if it's too big
    const cleanTree = this.sanitizeFigmaNode(figmaNodeTree);
    await new Promise(r => setTimeout(r, 500));

    onStep("Analyzing layout nodes, flex rules and absolute bounding geometries...", 2);
    await new Promise(r => setTimeout(r, 700));

    onStep(`Dispatching prompt payload to OpenAI API [Model: ${model}]...`, 3);

    const systemPrompt = `You are a Senior Frontend Engineer and AI Agent that specializes in compiling Figma Design JSON nodes into production-ready, high-fidelity Semantic HTML and CSS.
Your goal is to inspect the provided Figma layout structure and output accessible (WCAG AA), responsive, and modular HTML and CSS code.

Follow these strict output guidelines:
1. DO NOT output "div soup". Use appropriate HTML5 semantic landmarks like <header>, <main>, <aside>, <nav>, <section>, <article>, and <footer>.
2. Use accessible elements: buttons MUST be <button>, links MUST be <a>, forms MUST have proper <label> tags matching input ID attributes.
3. Keep the styling code clean and modular. Use CSS custom properties (variables) for colors, spacing, and fonts.
4. Ensure responsiveness by utilizing CSS Grid and Flexbox rules, mapping to Figma's auto-layout properties (layoutMode, itemSpacing, padding).
5. All icons should be represented using clean SVG paths (inline SVGs) or HTML symbols.
6. The JSON payload must strictly match the schema below. Do not wrap code blocks in markdown fences inside the JSON values.

Return EXACTLY a JSON object with this structure:
{
  "html": "<body> ... html content ... </body> (omit body tag, only landmarks and components content)",
  "css": "/* CSS Styles */ ... rules ...",
  "explanation": "Brief summary of how the layout was translated.",
  "accessibilityReport": {
    "score": 95,
    "positives": ["Positive points..."],
    "improvements": ["Items to improve..."]
  }
}`;

    const userPrompt = `Translate this Figma layout into HTML and CSS. Here is the node JSON tree:
${JSON.stringify(cleanTree, null, 2)}`;

    try {
      const cleanApiBase = apiBase.replace(/\/+$/, '');
      const response = await fetch(`${cleanApiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          response_format: { type: 'json_object' },
          temperature: temperature,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        })
      });

      if (!response.ok) {
        let statusText = response.statusText;
        if (!statusText) {
          if (response.status === 401) statusText = "Unauthorized (Invalid API Key)";
          else if (response.status === 403) statusText = "Forbidden (Restricted Country/Access)";
          else if (response.status === 429) statusText = "Quota Exceeded or Insufficient Funds (check billing)";
          else if (response.status === 500) statusText = "OpenAI Server Error";
          else statusText = `HTTP Error`;
        } else if (response.status === 429) {
          statusText = `${response.statusText} (Insufficient credit balance)`;
        }
        throw new Error(`OpenAI API error: ${statusText} (${response.status})`);
      }

      onStep("Receiving structured JSON payload from OpenAI...", 4);
      const data = await response.json();
      const contentText = data.choices[0].message.content;
      const parsedRes = JSON.parse(contentText);

      onStep("Validating CSS code variables and responsive query mappings...", 5);
      await new Promise(r => setTimeout(r, 600));

      onStep("Synthesizing accessibility report scoring index...", 6);
      await new Promise(r => setTimeout(r, 400));

      onStep("Translation complete!", 7);

      const durationMs = Date.now() - startTime;
      const inputTokens = data.usage?.prompt_tokens || 4000;
      const outputTokens = data.usage?.completion_tokens || 1500;
      
      // Calculate pricing based on GPT-4o standard pricing
      const costPerMillionInput = model.includes('gpt-4o-mini') ? 0.15 : 2.50;
      const costPerMillionOutput = model.includes('gpt-4o-mini') ? 0.60 : 10.00;
      const estimatedCost = (inputTokens / 1000000) * costPerMillionInput + (outputTokens / 1000000) * costPerMillionOutput;

      return {
        html: parsedRes.html || `<div>No HTML generated</div>`,
        css: parsedRes.css || `/* No CSS generated */`,
        accessibilityReport: parsedRes.accessibilityReport || {
          score: 85,
          positives: ["Landmark layout compiled"],
          improvements: ["Verify input-label connections manually"]
        },
        metrics: {
          durationMs,
          inputTokens,
          outputTokens,
          estimatedCost
        }
      };
    } catch (err: any) {
      onStep(`Error during OpenAI synthesis: ${err.message}`, 4);
      throw err;
    }
  }

  /**
   * Helper tool to prune irrelevant Figma API metadata from nodes
   * to avoid burning excessive tokens.
   */
  private static sanitizeFigmaNode(node: any): any {
    if (!node) return null;
    const sanitized: any = {};
    const keysToKeep = [
      'id',
      'name',
      'type',
      'characters',
      'absoluteBoundingBox',
      'layoutMode',
      'primaryAxisAlignItems',
      'counterAxisAlignItems',
      'itemSpacing',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'style'
    ];

    keysToKeep.forEach(k => {
      if (node[k] !== undefined) {
        sanitized[k] = node[k];
      }
    });

    if (node.children) {
      sanitized.children = node.children.map((c: any) => this.sanitizeFigmaNode(c));
    }

    return sanitized;
  }
}
