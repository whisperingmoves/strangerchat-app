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

      <Text style={styles.contentTxt} numberOfLines={0}>
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
