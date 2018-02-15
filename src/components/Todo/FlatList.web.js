// @flow
import * as React from 'react'
import { View } from 'react-native'

type Props = {
  /*
   * Array of data to determine the number of items in the list
   */
  data: Array<any>,
  /*
   * Function that receives an item as argument and should return the
   * rendered item
   */
  renderItem: Function,
  /*
   * Optional function to retrieve the component 'key' property from
   * the item.  Receives item as an argument and should return a string.
   * If not provided, FlatList assumes that 'data' contains an array of objects
   * which have a 'key' property
   */
  keyExtractor?: Function,

}

const FlatList = ({
  data = [],
  renderItem = () => null,
  keyExtractor = () => 0
}: Props) => (
  <View>
    {data.map((item, index) => (
      <View key={keyExtractor && keyExtractor(item) || item.key}>
        {renderItem({item, index})}
      </View>
    ))}
  </View>
)

export default FlatList
