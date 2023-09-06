import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import icon_next from '../../../assets/images/icons/icon_next.png';
import {TOP_UP} from '../../../constants/Config';

type Props = {
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={props.onPress}>
      <Text style={styles.txt}>{TOP_UP}</Text>

      <Image source={icon_next} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  txt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  icon: {
    width: 6,
    height: 12,
    tintColor: '#8B5CFF',
    resizeMode: 'cover',
  },
});
