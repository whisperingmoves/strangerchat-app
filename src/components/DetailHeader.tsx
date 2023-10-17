import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_more from '../assets/images/icons/icon_more.png';
import icon_backtrack from '../assets/images/icons/icon_backtrack.png';

type Props = {
  title: string;
  onBackPress: () => void;
  onMorePress?: () => void;
  style: StyleProp<ViewStyle>;
  hideMore?: boolean;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onBackPress}
        style={styles.backIcon}>
        <Image source={icon_backtrack} />
      </TouchableOpacity>

      <Text style={styles.txt}>{props.title}</Text>

      {!props.hideMore && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onMorePress}
          style={styles.moreIcon}>
          <Image source={icon_more} />
        </TouchableOpacity>
      )}
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
  backIcon: {
    position: 'absolute',
    left: 20,
  },
  moreIcon: {
    position: 'absolute',
    right: 20,
  },
  txt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
