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
