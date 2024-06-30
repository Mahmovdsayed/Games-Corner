'use client'
import { NextUIProvider } from '@nextui-org/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingScreen from "@/components/Layout/LoadingScreen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import authReducer from '../state/index';
import { Toaster } from 'react-hot-toast';


const persistConfig = { key: "root", storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();


  return (
    <NextUIProvider navigate={router.push}>
      <Toaster position="top-center" />

      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistStore(store)}>
          {children}
        </PersistGate>
      </Provider>
    </NextUIProvider>
  )
}

