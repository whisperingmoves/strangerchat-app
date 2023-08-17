import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_like_outlined from '../../../assets/images/icons/icon_like_outlined.png';
import {formatNumberWithSuffix} from '../../../utils/number';
import {LikeCount} from '../../following/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  count?: LikeCount;
};

export default (props: Props) => {
  const showCountTxt = Boolean(props.count && props.count > 0);

  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.root, props.style]}>
      <Image source={icon_like_outlined} />

      {showCountTxt && (
        <Text style={styles.txt}>
          {formatNumberWithSuffix(props.count as number)}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  txt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
