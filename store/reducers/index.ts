import { combineReducers } from '@reduxjs/toolkit'
import coinListReducer from './coinList'
import quotes from './quotes'

const rootReducer = combineReducers({
  [coinListReducer.name]: coinListReducer.reducer,
  [quotes.name]: quotes.reducer
})

export default rootReducer
