import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_next from '../../../assets/images/icons/icon_next.png';

export type Props = {
  icon: ImageSourcePropType;
  label: string;
  description?: string;
  target?: string;
};

export default (props: Props & {style: StyleProp<ViewStyle>}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    if (props.target) {
      navigation.push(props.target);
    }
  };

  return (
    <View style={[styles.root, props.style]}>
      <Image source={props.icon} />

      <Text style={styles.labelTxt}>{props.label}</Text>

      {props.description && (
        <Text style={styles.descTxt}>{props.description}</Text>
      )}

      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <Image source={icon_next} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  labelTxt: {
    flex: 1,
    height: 'auto',
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  descTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
