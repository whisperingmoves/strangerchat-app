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

import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getUsername} from '../../modules/helper';

export type UserId = string;

export type Username = string;

type Props = {
  userId: UserId;
  username?: Username;
  onPress: (userId: UserId) => void;
};

export default (props: Props) => {
  const handlePress = useCallback(() => {
    props.onPress(props.userId);
  }, [props]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Text style={styles.txt}>
        {`@${props.username ? props.username : getUsername(props.userId)}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
