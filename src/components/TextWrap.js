// @flow
import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

type TextWrapProps = {
  viewStyle: StyleSheet.StyleProp,
  textStyle: StyleSheet.StyleProp,
}

const TextWrap = ({ viewStyle, textStyle }: TextWrapProps) => (
    <View style={viewStyle}>
      <Text style={textStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aliquam tellus turpis, scelerisque vel elementum nec, consectetur in nunc.
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Donec vulputate ut ligula vitae semper. Etiam cursus risus et metus
        auctor, at efficitur ex interdum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Cras lacinia
        tortor sed suscipit lobortis. Aliquam pharetra sagittis magna id iaculis.
        Curabitur pretium fermentum nisl, convallis posuere ante rutrum vel.
        Mauris sit amet tellus id sapien mollis eleifend et eget dolor. Maecenas
        libero dui, ornare ut justo quis, iaculis dictum ex. Nam tristique,
        sapien quis iaculis tincidunt, orci augue vestibulum nulla, eget
        consequat mi lorem convallis velit. Integer pellentesque faucibus dolor,
        et pellentesque odio vehicula a.
      </Text>
    </View>
  )

export default TextWrap
