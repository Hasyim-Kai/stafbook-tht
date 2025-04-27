import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import DefaultLayout from '../components/Layout/DefaultLayout';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    }
  }
})

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <QueryClientProvider client={queryClient}>
    <Toaster />
    {pathname === '/signin' || pathname === '/signup' || pathname === '/404' ? <Outlet />
      : <DefaultLayout>
        <Outlet />
      </DefaultLayout>}
  </QueryClientProvider>
}

export default App;
