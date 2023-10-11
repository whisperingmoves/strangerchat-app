import React from 'react';
import {Image, ImageStyle, StyleSheet} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  avatar: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
};

export default (props: Props) => {
  return <Image style={[styles.root, props.style]} source={props.avatar} />;
};

const styles = StyleSheet.create({
  root: {
    width: 86,
    height: 86,
    borderRadius: 43,
    resizeMode: 'cover',
  },
});
