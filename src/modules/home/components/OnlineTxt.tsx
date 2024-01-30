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

import {StyleSheet, Text} from 'react-native';

import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {CURRENTLY_ONLINE} from '../../../constants/home/Config';
import {useAppSelector} from '../../../hooks';
import {formatNumber} from '../../../utils/number';
import {Online, onlineUsers} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const currentlyOnlineValue: Online = useAppSelector(onlineUsers);

  return (
    <Text style={[styles.root, props.style]}>
      {CURRENTLY_ONLINE}
      <Text style={styles.countTxt}>{formatNumber(currentlyOnlineValue)}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  countTxt: {
    color: '#62DDFF',
  },
});
