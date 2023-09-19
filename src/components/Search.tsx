import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_search from '../assets/images/icons/icon_search.png';
import {SEARCH} from '../constants/search/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  text?: string;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Image source={icon_search} />

      <TextInput
        style={styles.txt}
        placeholder={SEARCH}
        placeholderTextColor={'#8E8895'}
        returnKeyType={'search'}
        onChangeText={props.onChangeText}
        value={props.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // width: '100%',
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F1F0F3',
  },
  txt: {
    fontSize: 14,
    color: '#554C5F',
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
  },
});
