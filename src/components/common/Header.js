import React from 'react';
import {StyleSheet, StatusBar, Dimensions} from 'react-native';
import {Text, Block} from 'galio-framework';
const paddingTop = 10 + StatusBar.currentHeight;
const {width} = Dimensions.get('window');
export default function Header(props) {
  return (
    <Block style={[styles.nonBlurredContent, {paddingTop}]}>
      {props.left}
      <Text>{props.title}</Text>
      {props.right}
    </Block>
  );
}

const styles = StyleSheet.create({
  nonBlurredContent: {
    zIndex: 10,
    width,
    backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 10,
    top: 0,
    right: 0,
    left: 0,
    paddingBottom: 5,
  },
});
