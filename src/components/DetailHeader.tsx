import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_more from '../assets/images/icons/icon_more.png';
import icon_backtrack from '../assets/images/icons/icon_backtrack.png';
import {getUsername} from '../modules/helper';

type Props = {
  userId: string;
  username?: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
        <Image source={icon_backtrack} />
      </TouchableOpacity>

      <Text style={styles.txt}>
        {props.username ? props.username : getUsername(props.userId)}
      </Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Image source={icon_more} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
