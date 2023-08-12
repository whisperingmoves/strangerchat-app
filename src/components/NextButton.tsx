import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {NEXT} from '../constants/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.style}
      onPress={props.onPress}>
      <LinearGradient
        style={styles.container}
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.txt}>{NEXT}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
