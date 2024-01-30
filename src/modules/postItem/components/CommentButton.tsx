// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_comment_outlined from '../../../assets/images/icons/icon_comment_outlined.png';
import {formatNumberWithSuffix} from '../../../utils/number';
import {CommentCount} from '../../following/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  count?: CommentCount;
  onPress: () => void;
};

export default (props: Props) => {
  const showCountTxt = Boolean(props.count && props.count > 0);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={props.onPress}>
      <Image source={icon_comment_outlined} />

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
