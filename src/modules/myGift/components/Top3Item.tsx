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
import {StyleSheet, Text, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Avatar from './Avatar';
import {GiftData} from '../../../apis/gift/getReceivedGifts';
import {getUsername} from '../../helper';

export type Top3Item = GiftData;

type Props = Top3Item & {style: StyleProp<ViewStyle>};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Avatar
        avatar={props.avatar}
        currentRanking={props.currentRanking}
        userId={props.userId}
      />

      <Text style={styles.countTxt}>{props.count}</Text>

      <Text style={styles.usernameTxt}>
        {props.username ? props.username : getUsername(props.userId)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 6,
    alignItems: 'center',
  },
  countTxt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  usernameTxt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
