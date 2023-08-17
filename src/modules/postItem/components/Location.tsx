import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_location from '../../../assets/images/icons/icon_location.png';
import {City} from '../../following/store/slice';

type Props = {
  location?: City;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.location, props.style]}>
      <Image source={icon_location} />

      <Text style={styles.locationTxt}>{props.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationTxt: {
    color: '#8B5CFF',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
