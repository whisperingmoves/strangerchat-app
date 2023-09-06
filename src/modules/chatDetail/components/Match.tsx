import React from 'react';
import {StyleSheet, Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {MATCH} from '../../../constants/chatDetail/Config';

export default (props: Props) => {
  return (
    <LinearGradient
      style={styles.root}
      colors={['#FF5FB0', '#FF4288']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.txt}>{MATCH}</Text>

      <Text style={styles.txt}>{props.percentage}</Text>
    </LinearGradient>
  );
};

type Props = {
  percentage: string;
};

const styles = StyleSheet.create({
  root: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  txt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
