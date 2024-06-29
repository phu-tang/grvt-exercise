import { configureStore, StoreEnhancer, applyMiddleware, UnknownAction } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { RootState } from '@/constants/type'
import storage from 'redux-persist-expo-filesystem'
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin'

import { baseapi } from './reducers/api'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

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

const middlewareEnhancer = applyMiddleware(baseapi.middleware)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(middlewareEnhancer, devToolsEnhancer() as StoreEnhancer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareOptions)
})

export default store
