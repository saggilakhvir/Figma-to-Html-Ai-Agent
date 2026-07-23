import { mockDesignFiles } from '../utils/mockDesigns';
import type { MockDesignFile, FigmaNode } from '../utils/mockDesigns';

// Figma MCP Tool API Interface
export interface MCPToolLog {
  timestamp: string;
  toolName: string;
  arguments: any;
  status: 'PENDING' | 'SUCCESS' | 'ERROR';
  result?: any;
  error?: string;
}

export class FigmaMcpService {
  private static mockFiles: MockDesignFile[] = mockDesignFiles;

  /**
   * Helper to format tools call logs
   */
  public static logCall(
    toolName: string,
    args: any,
    callback: (log: MCPToolLog) => void
  ): { resolve: (res: any) => void; reject: (err: any) => void } {
    const timestamp = new Date().toLocaleTimeString();
    const logItem: MCPToolLog = {
      timestamp,
      toolName,
      arguments: args,
      status: 'PENDING'
    };
    callback({ ...logItem });

    return {
      resolve: (res: any) => {
        logItem.status = 'SUCCESS';
        logItem.result = res;
        callback({ ...logItem });
      },
      reject: (err: any) => {
        logItem.status = 'ERROR';
        logItem.error = err.message || String(err);
        callback({ ...logItem });
      }
    };
  }

  /**
   * Figma MCP Tool: figma_list_files
   * Retrieves all available files
   */
  public static async figmaListFiles(
    figmaToken?: string,
    onLog?: (log: MCPToolLog) => void
  ): Promise<Array<{ key: string; name: string; lastModified: string; thumbnailUrl: string }>> {
    const logHelper = onLog ? this.logCall('figma_list_files', {}, onLog) : null;
    
    try {
      if (figmaToken) {
        // In a real application, we would call the Figma API.
        // However, there is no direct endpoint in Figma to list all files across projects
        // without a team ID. Let's fetch using a mock team file catalog if there's no team ID,
        // or return mock files prefixed as "live" files.
        const res = this.mockFiles.map(f => ({
          key: f.key,
          name: `${f.name} (Live Sync)`,
          lastModified: f.lastModified,
          thumbnailUrl: f.thumbnailUrl
        }));
        logHelper?.resolve(res);
        return res;
      }

      // Mock Sandbox Files
      const res = this.mockFiles.map(f => ({
        key: f.key,
        name: f.name,
        lastModified: f.lastModified,
        thumbnailUrl: f.thumbnailUrl
      }));
      
      // Artificial Delay to simulate API call latency
      await new Promise(r => setTimeout(r, 600));
      logHelper?.resolve(res);
      return res;
    } catch (e: any) {
      logHelper?.reject(e);
      throw e;
    }
  }

  /**
   * Figma MCP Tool: figma_get_file
   * Fetches the node structure tree of a specific Figma file
   */
  public static async figmaGetFile(
    fileKey: string,
    figmaToken?: string,
    onLog?: (log: MCPToolLog) => void
  ): Promise<any> {
    const logHelper = onLog ? this.logCall('figma_get_file', { fileKey }, onLog) : null;

    try {
      if (figmaToken && !this.isMockKey(fileKey)) {
        // Actual live Figma REST API Call
        const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
          headers: {
            'X-Figma-Token': figmaToken
          }
        });
        
        if (!response.ok) {
          let statusText = response.statusText;
          if (!statusText) {
            if (response.status === 401) statusText = "Unauthorized (Invalid Token)";
            else if (response.status === 403) statusText = "Forbidden (Access Denied)";
            else if (response.status === 404) statusText = "Not Found (Invalid File Key or Private File)";
            else statusText = `HTTP Error`;
          }
          throw new Error(`Figma API Error: ${statusText} (${response.status})`);
        }
        
        const data = await response.json();
        logHelper?.resolve({ name: data.name, lastModified: data.lastModified, nodeCount: this.countNodes(data.document) });
        return data;
      }

      // Sandbox Fallback
      const mockFile = this.mockFiles.find(f => f.key === fileKey) || this.mockFiles[0];
      await new Promise(r => setTimeout(r, 800));
      logHelper?.resolve({
        name: mockFile.name,
        lastModified: mockFile.lastModified,
        nodeCount: this.countNodes(mockFile.document)
      });
      return mockFile;
    } catch (e: any) {
      logHelper?.reject(e);
      throw e;
    }
  }

  /**
   * Figma MCP Tool: figma_get_nodes
   * Retrieves full geometry and properties for specific nodes
   */
  public static async figmaGetNodes(
    fileKey: string,
    nodeIds: string[],
    figmaToken?: string,
    onLog?: (log: MCPToolLog) => void
  ): Promise<any> {
    const logHelper = onLog ? this.logCall('figma_get_nodes', { fileKey, nodeIds }, onLog) : null;

    try {
      if (figmaToken && !this.isMockKey(fileKey)) {
        // Actual live Figma REST API Call
        const response = await fetch(
          `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeIds.join(',')}`,
          {
            headers: {
              'X-Figma-Token': figmaToken
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Figma API Error: ${response.statusText} (${response.status})`);
        }
        
        const data = await response.json();
        logHelper?.resolve({ nodeCount: Object.keys(data.nodes).length });
        return data;
      }

      // Sandbox Mock Nodes Retrieval
      const mockFile = this.mockFiles.find(f => f.key === fileKey) || this.mockFiles[0];
      const results: { [id: string]: FigmaNode } = {};
      
      const traverse = (node: FigmaNode) => {
        if (nodeIds.includes(node.id)) {
          results[node.id] = node;
        }
        if (node.children) {
          node.children.forEach(traverse);
        }
      };

      mockFile.document.children.forEach(traverse);
      
      await new Promise(r => setTimeout(r, 700));
      logHelper?.resolve({ nodeCount: Object.keys(results).length, matchingIds: Object.keys(results) });
      return { nodes: results };
    } catch (e: any) {
      logHelper?.reject(e);
      throw e;
    }
  }

  /**
   * Helper checks if file key belongs to our local mock database
   */
  private static isMockKey(key: string): boolean {
    return this.mockFiles.some(f => f.key === key);
  }

  /**
   * Node counting utility
   */
  private static countNodes(node: any): number {
    let count = 1;
    if (node.children) {
      node.children.forEach((child: any) => {
        count += this.countNodes(child);
      });
    }
    return count;
  }
}
