import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper'
import globalStyles from '../../utils/globalStyles'

const Chips = (props) => {
  return (
    <View >
      <Chip style={{ marginRight: 10, height: 50, marginBottom: 10,
        backgroundColor: globalStyles.primaryColor}} textStyle={[globalStyles.mainText, 
        {textAlign: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}]}>{props.content}</Chip>
    </View>
  )
}

const styles = StyleSheet.create({
  Card: {
    // resizeMode: 'contain',
    // top: 50,
    // height: 25,
    // width: 60,
  },
})

export default Chips