import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const token = localStorage.getItem('vmax-auth-token');
        const headers: Record<string, string> = {};
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await fetch(queryKey[0] as string, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
    },
  },
});

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('vmax-auth-token');
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};