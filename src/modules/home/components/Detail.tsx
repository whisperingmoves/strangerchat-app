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
import {CreateTime, Username} from '../store/slice';
import {formatTimeAgo} from '../../../utils/date';

type Props = {
  username: Username;
  createTime: CreateTime;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={[styles.txt, styles.usernameTxt]}>{props.username}</Text>

      <Text style={[styles.txt, styles.updatedAtTxt]}>
        {formatTimeAgo(props.createTime)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 1,
  },
  txt: {
    color: '#FFFFFF',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  usernameTxt: {
    fontSize: 10,
  },
  updatedAtTxt: {
    fontSize: 6,
  },
});
