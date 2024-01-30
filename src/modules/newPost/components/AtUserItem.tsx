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
import {LayoutAnimation, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar as AvatarType,
  removeCheckedAtUser,
  updateCheckedAtUsers,
  UserId,
  Username as UsernameType,
} from '../store/slice';
import Avatar from './Avatar';
import Username from './Username';
import Checked from './Checked';
import Check from './Check';
import {useAppDispatch} from '../../../hooks';

export type Props = {
  userId: UserId;
  avatar: AvatarType;
  username?: UsernameType;
  isChecked?: boolean;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    !props.isChecked
      ? dispatch(
          updateCheckedAtUsers({
            userId: props.userId,
            username: props.username,
          }),
        )
      : dispatch(removeCheckedAtUser(props.userId));
  }, [dispatch, props.isChecked, props.userId, props.username]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      {props.isChecked ? <Checked /> : <Check />}

      <Avatar avatar={props.avatar} />

      <Username userId={props.userId} username={props.username} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
