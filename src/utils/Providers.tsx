'use client'

import { Provider } from 'react-redux'
import store from '@/store'
import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface ProvidersProps {
  children: ReactNode
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
  )
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  )
}
