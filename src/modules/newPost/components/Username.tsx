import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {UserId, Username} from '../store/slice';
import {getUsername} from '../../helper';

type Props = {
  userId: UserId;
  username?: Username;
};

export default (props: Props) => {
  return (
    <Text style={styles.root}>
      {props.username ? props.username : getUsername(props.userId)}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
