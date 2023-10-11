import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import icon_add_friends from '../../../assets/images/icons/icon_add_friends.png';
import {FRIENDS} from '../../../constants/profile/Config';

export default () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Image source={icon_add_friends} style={styles.icon} />

      <Text style={styles.txt}>{FRIENDS}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 14,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    backgroundColor: '#00000033',
  },
  icon: {
    width: 20,
    height: 16,
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
