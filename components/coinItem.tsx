import React from 'react'
import { View, Text } from 'react-native'
import { Color } from '@/constants/color'
import { useSelector } from 'react-redux'
import { getCoinInfoByKey } from '@/store/reducers/coinList'
import { getQuoteInfoByKey } from '@/store/reducers/quotes'
import { round } from 'lodash'

type ItemCoinProps = {
  coinId: string
}
const getColorCode = (percentValue: number) => {
  if (percentValue > 0) {
    return Color.upText
  } else if (percentValue < 0) {
    return Color.downText
  }
  return Color.zeroText
}
const ItemCoin = ({ coinId }: ItemCoinProps) => {
  const coinInfo = useSelector(getCoinInfoByKey(coinId))
  const quote = useSelector(getQuoteInfoByKey(coinId))
  return (
    <View style={{ flexDirection: 'row', marginTop: 12 }}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: Color.primaryText }}>{coinInfo.symbol}</Text>
        <Text style={{ color: Color.secondaryText }}>{coinInfo.name}</Text>
      </View>
      <View style={{ flex: 1 }} />
      <View>
        <Text style={{ color: getColorCode(quote.USD.percent_change_1h), textAlign: 'right' }}>
          {round(Math.abs(quote.USD.percent_change_1h), 2)}%
        </Text>
        <Text style={{ color: Color.primaryText, textAlign: 'right' }}>
          ${new Intl.NumberFormat('en-US').format(round(quote.USD.price, 2))}
        </Text>
      </View>
    </View>
  )
}

export default ItemCoin
