import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from './components/Theme/ThemeProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 30000,
        }
    }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system">
          <App />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={true} position='bottom'/>
      </QueryClientProvider>
  </StrictMode>,
)
