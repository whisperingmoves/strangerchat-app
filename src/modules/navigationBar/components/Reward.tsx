import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {RewardProps} from '../helper';

export default (props: RewardProps) => {
  const contentStyle: StyleProp<ViewStyle> = {
    borderWidth: props.active ? 1 : 0,
    borderColor: '#8B5CFF',
  };

  const labelTxtStyle: StyleProp<TextStyle> = {
    color: props.active ? '#8B5CFF' : '#C7C4CC',
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.content, contentStyle]}>
        <Image source={props.icon} />

        <Text style={styles.amountTxt}>+{props.amount}</Text>
      </TouchableOpacity>

      <Text style={[styles.labelTxt, labelTxtStyle]}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 10,
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#8B5CFF',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  amountTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
