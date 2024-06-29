import rootReducer from '@/store/reducers'

export type CoinListQueryType = {
  start: number
  limit: number
}

export type ResponseStatusType = {
  timestamp: string
  error_code: number
  error_message: string | null
  total_count?: number
}

export type ResponseCoinType = {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  quote: {
    USD: QuoteType
  }
}

export type QuoteType = {
  price: number
  volume_24h: number
  percent_change_1h: number
  percent_change_24h: number
  last_updated: number
}

export type CoinListResponse = {
  status: ResponseStatusType
  data: ResponseCoinType[]
}

export type CoinStateType = {
  [key: string]: ResponseCoinType
}

export type QuoteStateStype = {
  [key: string]: QuoteType
}

export type RootState = ReturnType<typeof rootReducer>
