import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider} from 'notistack'
import { AuthenticationContext } from './contexApi.tsx';
createRoot(document.getElementById('root')!).render(
 <StrictMode>

   <QueryClientProvider client={queryClient}>
    <AuthenticationContext>
    <BrowserRouter>
    <SnackbarProvider autoHideDuration={3000}>
    <App />
    </SnackbarProvider>
    </BrowserRouter>
    </AuthenticationContext>
  </QueryClientProvider>
 </StrictMode>

 
)
