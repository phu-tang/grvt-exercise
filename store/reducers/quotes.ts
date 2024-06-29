import { createSlice } from '@reduxjs/toolkit'
import { baseapi } from './api'
import { QuoteStateStype, ResponseCoinType } from '@/constants/type'
import { flow, keyBy, map, path } from 'lodash/fp'

const initialState: QuoteStateStype = {}

const coinListReducer = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    reset() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(coinListReducer.actions.reset, () => initialState)
    builder.addMatcher(baseapi.endpoints.getCoinList.matchFulfilled, (state, action) => {
      const coins = action?.payload?.data as ResponseCoinType[]
      const mapCoin = map((item: ResponseCoinType) => ({ id: item.id, ...item.quote }))(coins)
      return {
        ...state,
        ...keyBy('id', mapCoin)
      }
    })
    builder.addMatcher(baseapi.endpoints.getQuotes.matchFulfilled, (state, action) => {
      const mappingData = flow(
        path('payload.data'),
        map((item: ResponseCoinType) => ({ id: item.id, ...item.quote })),
        keyBy('id')
      )(action)
      return { ...state, ...mappingData }
    })
  }
})

export const getQuoteInfoByKey = (coinKey: string) => flow(path(coinListReducer.name), path(coinKey))
export default coinListReducer
