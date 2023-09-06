import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SEND} from '../../../constants/Config';

type Props = {
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.root}>
        <Text style={styles.txt}>{SEND}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
