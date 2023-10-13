import React, {useMemo} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_location from '../assets/images/icons/icon_location.png';

type Props = {
  location: string;
  color?: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const iconStyle: StyleProp<ImageStyle> = useMemo(() => {
    return {
      tintColor: props.color ? props.color : '#FFF',
    };
  }, [props.color]);

  const txtStyle: StyleProp<TextStyle> = useMemo(() => {
    return {
      color: props.color ? props.color : '#FFF',
    };
  }, [props.color]);

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, props.style]}>
      <Image source={icon_location} style={[styles.icon, iconStyle]} />

      <Text style={[styles.txt, txtStyle]}>{props.location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 16,
    resizeMode: 'cover',
  },
  txt: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
