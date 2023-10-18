import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_card from '../../../assets/images/icons/icon_card.png';
import {CARD} from '../../../constants/wallet/Config';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, props.style]}>
      <Image source={icon_card} />

      <Text style={styles.txt}>{CARD}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#00000033',
    gap: 6,
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
