import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FOLLOWING} from '../constants/Config';

type Props = {
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={props.onPress}>
      <Text style={styles.txt}>{FOLLOWING}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#8E8895',
    fontSize: 10,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
