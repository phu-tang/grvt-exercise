import React, { useCallback, useEffect, useState } from 'react'
import { View, SafeAreaView, FlatList, RefreshControl, TextInput } from 'react-native'
import { useLazyGetCoinListQuery, useLazyGetQuotesQuery } from '@/store/reducers/api'
import { useDispatch, useSelector } from 'react-redux'
import { coinsListSelector, coinsSizeSelector, reset } from '@/store/reducers/coinList'
import { isEmpty, map } from 'lodash/fp'
import { debounce } from 'lodash'
import ItemCoin from './coinItem'
import { Color } from '@/constants/color'

const Layout = () => {
  const [getData, { isFetching }] = useLazyGetCoinListQuery()
  const [viewItems, updateViewItems] = useState<string[]>([])
  const [getQuote] = useLazyGetQuotesQuery()
  const dispatch = useDispatch()
  const coinSize = useSelector(coinsSizeSelector)
  const [textSearch, updateTextSearch] = useState<string>('')
  const coinsList = useSelector(coinsListSelector(textSearch))
  const updateView = useCallback(
    debounce(({ viewableItems }) => {
      const item = map(({ item }) => item)(viewableItems)
      updateViewItems(item)
    }, 500),
    []
  )
  useEffect(() => {
    getData({ start: coinSize + 1, limit: 30 })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getQuote({ id: viewItems })
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <View
      style={{
        flex: 1,
        padding: 18,
        backgroundColor: Color.background
      }}
    >
      <SafeAreaView>
        <TextInput
          inlineImageLeft='search'
          value={textSearch}
          onChangeText={updateTextSearch}
          style={{
            height: 40,
            borderWidth: 1,
            padding: 10,
            backgroundColor: Color.textInputBackground,
            borderRadius: 30,
            color: Color.textInputColor
          }}
          clearButtonMode='while-editing'
        />
        <FlatList
          initialNumToRender={30}
          onViewableItemsChanged={updateView}
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
                getData({ start: 1, limit: 30 })
              }}
            />
          }
        />
      </SafeAreaView>
    </View>
  )
}

export default Layout
