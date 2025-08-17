import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export async function apiRequest(
  method: string,
  url: string,
  data?: any
): Promise<any> {
  const token = localStorage.getItem('vmax-auth-token');
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}

export const getQueryFn = ({ on401 }: { on401: string }) => {
  return async ({ queryKey }: { queryKey: any[] }) => {
    try {
      return await apiRequest('GET', queryKey[0]);
    } catch (error: any) {
      if (error.message.includes('401') && on401 === 'returnNull') {
        return null;
      }
      throw error;
    }
  };
};