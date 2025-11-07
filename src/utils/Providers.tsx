"use client";

import { Provider } from "react-redux";
import store from "@/store";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/store";

interface ProvidersProps {
  children: ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 border border-red-200">
        <h2 className="text-xl font-bold text-red-600 mb-2 text-right">
          ⚠️ عذراً، صار خطأ
        </h2>
        <p className="text-gray-700 text-right mb-4">
          حصل خلل أثناء تشغيل التطبيق. التفاصيل:
        </p>
        <pre className="bg-gray-50 text-red-500 text-sm p-3 rounded-md overflow-x-auto mb-4 text-left">
          {error.message}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          🔄 أعد المحاولة
        </button>
      </div>
    </div>
  );
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
