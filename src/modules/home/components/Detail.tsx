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
