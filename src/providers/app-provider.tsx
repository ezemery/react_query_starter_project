import { RoutingProvider } from './routing-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ErrorBoundary } from 'react-error-boundary';
import { fallbackComponent } from '@/components';
export function AppProvider() {
  return (
    <ErrorBoundary FallbackComponent={fallbackComponent}>
      <ReactQueryProvider>
        <RoutingProvider />
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}
