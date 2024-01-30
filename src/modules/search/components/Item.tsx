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
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {HotPost} from '../../../apis/post/getHotPosts';
import {getUsername} from '../../helper';
import {formatNumberWithSuffix} from '../../../utils/number';

export interface Props extends HotPost {
  number: number;
}

export default (props: Props) => {
  const numberStyle: StyleProp<TextStyle> = {
    color:
      props.number === 1
        ? '#FF4288'
        : props.number === 2
        ? '#F85BFE'
        : props.number === 3
        ? '#40B2FF'
        : '#C7C4CC',
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Text style={[styles.numberTxt, numberStyle]}>{props.number}</Text>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.usernameTxt}>
            {props.username ? props.username : getUsername(props.userId)}
          </Text>

          <Text style={styles.hotIndexTxt}>
            {formatNumberWithSuffix(props.hotIndex ? props.hotIndex : 0)}
          </Text>
        </View>

        <Text style={[styles.usernameTxt, styles.contentTxt]}>
          {props.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  numberTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 23,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  usernameTxt: {
    color: '#554C5F',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  hotIndexTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    lineHeight: 14,
  },
  contentTxt: {
    color: '#8E8895',
  },
});
