# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Solution

- State management: redux
  - Slice to handle reducer
  - RTK query to handle api request
  - Redux persist to handle persist data (support display offline)
- Reducer explanation:
  - coins reducer: contains all coins information such as name, symble, etc. The values will be get from latest coin api
  - quote reducer: contain all quotes from the given by the coins. The values will be get from get coins latest api and quotes api.
- Data render:
  - UI lib: `@shopify/flash-list` for better performance.
  - List render by list of ID (keys in coin reducer)
  - Item render by connected component (data given by key: information from coins reducer and pricing from quote)
  - search: using state to handle value then filter by seletector (key selector)
  - polling api base useEffect life cycle (start interval) and the of ids in screen controlled by state and update debonce by `onViewableItemsChanged`
  - Data load more, and pull to refresh handled by Flashlist props
