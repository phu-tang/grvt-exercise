/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { configureStore, StoreEnhancer, UnknownAction } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { RootState } from '@/constants/type'
import storage from 'redux-persist-expo-filesystem'
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin'

import { baseapi } from './reducers/api'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'grvt',
  storage,
  whitelist: []
}
const persistedReducer = persistReducer<RootState, UnknownAction>(persistConfig, rootReducer)

const defaultMiddlewareOptions = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
  }
}
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(devToolsEnhancer() as StoreEnhancer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(defaultMiddlewareOptions).concat(baseapi.middleware).concat(thunk)
})

export default store
