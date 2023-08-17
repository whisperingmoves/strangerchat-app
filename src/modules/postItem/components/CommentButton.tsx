import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_comment_outlined from '../../../assets/images/icons/icon_comment_outlined.png';
import {formatNumberWithSuffix} from '../../../utils/number';
import {CommentCount} from '../../following/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  count: CommentCount;
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={props.onPress}>
      <Image source={icon_comment_outlined} />

      {props.count && props.count > 0 && (
        <Text style={styles.txt}>{formatNumberWithSuffix(props.count)}</Text>
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
