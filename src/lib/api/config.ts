 
class ApiConfig {
  private getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
  }

  private getTimeout(): number {
    return parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || '100000');
  }

  getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.getBaseUrl()}${endpoint}`;
    const timeout = this.getTimeout();
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const config: RequestInit = {
      signal: controller.signal,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`API request timed out after ${timeout}ms`);
      }
      throw error;
    }
  }

  async authRequest<T>(endpoint: string, token: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Authorization': `Bearer ${token}`,
      ...this.getHeaders(),
      ...options.headers,
    };
    return this.request<T>(endpoint, { ...options, headers });
  }
}

export const apiConfig = new ApiConfig();