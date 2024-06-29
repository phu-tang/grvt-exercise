import { createSlice } from '@reduxjs/toolkit'
import { baseapi } from './api'
import { CoinStateType, ResponseCoinType } from '@/constants/type'
import { filter, flow, includes, isEmpty, keyBy, keys, path, size, toLower } from 'lodash/fp'

const initialState: CoinStateType = {}

const coinListReducer = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    reset() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(baseapi.endpoints.getCoinList.matchFulfilled, (state, action) => {
      const coins = action?.payload?.data as ResponseCoinType[]
      return {
        ...state,
        ...keyBy('id', coins)
      }
    })
  },
  selectors: {
    coinsSizeSelector: size
  }
})
export const coinsListSelector = (searchKey: string) => {
  return flow(
    path(coinListReducer.name),
    (coins: CoinStateType[]) => {
      if (isEmpty(searchKey)) {
        return coins
      }
      return flow(
        filter((item: ResponseCoinType) => {
          const result =
            includes(toLower(searchKey), toLower(item.name)) || includes(toLower(searchKey), toLower(item.symbol))
          return result
        }),
        keyBy('id')
      )(coins)
    },
    keys
  )
}

export const getCoinInfoByKey = (coinKey: string) => flow(path(coinListReducer.name), path(coinKey))
export const { coinsSizeSelector } = coinListReducer.selectors
export const { reset } = coinListReducer.actions
export default coinListReducer
