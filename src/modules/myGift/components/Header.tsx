import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_backtrack from '../../../assets/images/icons/icon_backtrack.png';
import {MY_GIFT} from '../../../constants/myGift/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPress}
        style={styles.btn}>
        <Image source={icon_backtrack} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.txt}>{MY_GIFT}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    position: 'absolute',
    left: 20,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: '#FFF',
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
