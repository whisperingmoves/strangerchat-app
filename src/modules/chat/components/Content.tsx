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
import {
  LastMessageContent,
  LastMessageTime,
  OpponentUserId,
  OpponentUsername,
} from '../store/slice';
import {getUsername} from '../../helper';
import {formatTimestamp} from '../../../utils/date';

type Props = {
  userId: OpponentUserId;
  username?: OpponentUsername;
  updateTime: LastMessageTime;
  content: LastMessageContent;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <Text style={styles.usernameTxt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        <Text style={styles.updateTimeTxt}>
          {formatTimestamp(props.updateTime)}
        </Text>
      </View>

      <Text style={styles.contentTxt} numberOfLines={1}>
        {props.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 8,
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usernameTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  updateTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  contentTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
