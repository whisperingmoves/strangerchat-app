import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_location from '../../../assets/images/icons/icon_location.png';
import {city} from '../store/slice';
import {useAppSelector} from '../../../hooks';
import {UNKNOWN} from '../../../constants/newPost/Config';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const cityValue = useAppSelector(city);

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, props.style]}>
      <Image style={styles.img} source={icon_location} />

      <Text style={styles.txt}>{cityValue || UNKNOWN}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#F1F0F3',
  },
  img: {
    width: 10,
    height: 12,
    tintColor: '#8E8895',
    resizeMode: 'cover',
  },
  txt: {
    color: '#8E8895',
    fontSize: 14,
  },
});
