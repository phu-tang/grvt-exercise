import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CoinListResponse, CoinListQueryType } from '@/constants/type'
// Define a service using a base URL and expected endpoints
export const baseapi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-CMC_PRO_API_KEY', process.env.EXPO_PUBLIC_API_KEY || '')
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCoinList: builder.query<CoinListResponse, CoinListQueryType>({
      query: (coinList) => ({ url: '/v1/cryptocurrency/listings/latest', params: { ...coinList } })
    })
  })
})

export const { useGetCoinListQuery, useLazyGetCoinListQuery } = baseapi
