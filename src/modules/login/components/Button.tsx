import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {GET_VERIFICATION_CODE} from '../../../constants/login/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <LinearGradient
        style={[styles.root, props.style]}
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.txt}>{GET_VERIFICATION_CODE}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
