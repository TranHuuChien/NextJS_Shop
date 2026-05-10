'use client'
import React, { Suspense, useState } from 'react';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthContextExports from '@/context/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const GlobalProvider = ({ children }) => {
  // useState ensures one stable QueryClient instance per component lifecycle
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,   // no refetch on tab switch
        refetchOnReconnect: false,     // no refetch on network reconnect
        retry: 1,                      // only retry once on failure
        staleTime: 1000 * 60 * 5,     // data stays fresh for 5 minutes
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <AuthContextExports.AuthContextProvider>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthContextExports.AuthContextProvider>
        </PersistGate>
      </Provider>
      <Suspense fallback={null}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  );
};

export default GlobalProvider;