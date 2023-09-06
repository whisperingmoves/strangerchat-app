import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import icon_people from '../../../assets/images/icons/icon_people.png';
import {FOLLOWING} from '../../../constants/Config';

export default () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Image source={icon_people} />

      <Text style={styles.txt}>{FOLLOWING}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#554C5F',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
