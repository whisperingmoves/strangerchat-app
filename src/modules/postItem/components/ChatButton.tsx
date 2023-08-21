import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CHAT} from '../../../constants/Config';

export default () => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Text style={styles.txt}>{CHAT}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 52,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#8B5CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#8B5CFF',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
