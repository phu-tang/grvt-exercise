import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CoinListResponse, CoinListQueryType, QuotesListRequestType, QuoteListResponse } from '@/constants/type'
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
    }),
    getQuotes: builder.query<QuoteListResponse, QuotesListRequestType>({
      query: (request) => ({ url: '/v2/cryptocurrency/quotes/latest', params: { id: request.id.join(',') } })
    })
  })
})

export const { useGetCoinListQuery, useLazyGetCoinListQuery, useGetQuotesQuery, useLazyGetQuotesQuery } = baseapi
