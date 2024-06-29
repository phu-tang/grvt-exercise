import { combineReducers } from '@reduxjs/toolkit'
import coinListReducer from './coinList'
import quotes from './quotes'
import { baseapi } from './api'

const rootReducer = combineReducers({
  [coinListReducer.name]: coinListReducer.reducer,
  [quotes.name]: quotes.reducer,
  [baseapi.reducerPath]: baseapi.reducer
})

export default rootReducer
