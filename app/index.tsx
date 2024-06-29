import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Text, FlatList, RefreshControl, TextInput } from 'react-native'
import { useLazyGetCoinListQuery, useGetQuotesQuery } from '@/store/reducers/api'
import { useDispatch, useSelector } from 'react-redux'
import { coinsListSelector, coinsSizeSelector, getCoinInfoByKey, reset } from '@/store/reducers/coinList'
import { isEmpty } from 'lodash/fp'
import { getQuoteInfoByKey } from '@/store/reducers/quotes'

type ItemCoinProps = {
  coinId: string
}
const ItemCoin = ({ coinId }: ItemCoinProps) => {
  const coinInfo = useSelector(getCoinInfoByKey(coinId))
  const quote = useSelector(getQuoteInfoByKey(coinId))
  return (
    <View>
      <Text>{coinInfo.symbol}</Text>
      <Text>{coinInfo.name}</Text>
      <Text>{quote.USD.price}</Text>
      <Text>{quote.USD.percent_change_1h}</Text>
    </View>
  )
}

const Layout = () => {
  const [getData, { isFetching }] = useLazyGetCoinListQuery()
  const originalCoinList = useSelector(coinsListSelector(''))
  useGetQuotesQuery(
    { id: originalCoinList },
    { pollingInterval: 30 * 1000, skip: isEmpty(originalCoinList), refetchOnReconnect: true, refetchOnFocus: true }
  )
  const dispatch = useDispatch()
  const coinSize = useSelector(coinsSizeSelector)
  const [textSearch, updateTextSearch] = useState<string>('')
  const coinsList = useSelector(coinsListSelector(textSearch))

  useEffect(() => {
    getData({ start: coinSize + 1, limit: 30 })
  }, [])
  return (
    <View
      style={{
        flex: 1,
        padding: 12
      }}
    >
      <SafeAreaView>
        <TextInput
          value={textSearch}
          onChangeText={updateTextSearch}
          style={{ height: 40, borderWidth: 1, padding: 10 }}
          clearButtonMode='while-editing'
        />
        <FlatList
          data={coinsList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ItemCoin coinId={item} />}
          onEndReached={() => {
            if (!isEmpty(textSearch)) {
              return
            }
            getData({ start: coinSize + 1, limit: 30 })
          }}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                if (!isEmpty(textSearch)) {
                  return
                }
                dispatch(reset())
                getData({ start: coinSize + 1, limit: 30 })
              }}
            />
          }
        />
      </SafeAreaView>
    </View>
  )
}

export default Layout
