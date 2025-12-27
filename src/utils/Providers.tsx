'use client';

import { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';

interface ProvidersProps {
  children: ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-lg">
        <h2 className="mb-2 text-right text-xl font-bold text-red-600">
          ⚠️ عذراً، صار خطأ
        </h2>
        <p className="mb-4 text-right text-gray-700">
          حصل خلل أثناء تشغيل التطبيق. التفاصيل:
        </p>
        <pre className="mb-4 overflow-x-auto rounded-md bg-gray-50 p-3 text-left text-sm text-red-500">
          {error.message}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
        >
          🔄 أعد المحاولة
        </button>
      </div>
    </div>
  );
}

export function Providers({ children }: ProvidersProps) {
  // Create QueryClient instance in state to avoid recreating on re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {children}
        {/* React Query Devtools - only shows in development */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
