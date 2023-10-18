import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type Props = {
  tintColor: string;
  icon: ImageSourcePropType;
  label: string;
  onPress?: () => void;
};

export default (props: Props) => {
  const btnStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: props.tintColor,
    };
  }, [props.tintColor]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.btn, btnStyle]}
        onPress={props.onPress}>
        <Image source={props.icon} />
      </TouchableOpacity>

      <Text style={styles.labelTxt}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 8,
    alignItems: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTxt: {
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
