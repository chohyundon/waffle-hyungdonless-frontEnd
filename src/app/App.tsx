import { Home } from '../pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QuerxClientProvider client={queryClient}>
        <Home />
      </QuerxClientProvider>
    </>
  );
}
