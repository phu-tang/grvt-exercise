import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store from '../store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen
              name='index'
              options={{
                // Hide the header for this route
                headerShown: false
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
