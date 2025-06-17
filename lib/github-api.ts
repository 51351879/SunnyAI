interface GitHubFile {
    content: string;
    sha: string;
  }
  
  interface CommitData {
    message: string;
    content: string;
    path: string;
    sha?: string;
  }
  
  class GitHubAPI {
    private token: string;
    private owner: string;
    private repo: string;
    private branch: string;
  
    constructor() {
      this.token = process.env.GITHUB_TOKEN || '';
      this.owner = process.env.GITHUB_OWNER || '';
      this.repo = process.env.GITHUB_REPO || '';
      this.branch = process.env.GITHUB_BRANCH || 'main';
    }
  
    private async makeRequest(endpoint: string, options: RequestInit = {}) {
      const url = `https://api.github.com/repos/${this.owner}/${this.repo}/${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
  
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }
  
      return response.json();
    }
  
    async getFile(path: string): Promise<GitHubFile> {
      const data = await this.makeRequest(`contents/${path}?ref=${this.branch}`);
      return {
        content: atob(data.content.replace(/\n/g, '')),
        sha: data.sha,
      };
    }
  
    async updateFile(data: CommitData): Promise<void> {
      const body = {
        message: data.message,
        content: btoa(data.content),
        branch: this.branch,
        ...(data.sha && { sha: data.sha }),
      };
  
      await this.makeRequest(`contents/${data.path}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    }
  }
  
  export const githubAPI = new GitHubAPI();