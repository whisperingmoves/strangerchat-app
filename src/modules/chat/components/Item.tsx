import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Content from './Content';
import Avatar from './Avatar';
import {
  ConversationId,
  LastMessageContent,
  LastMessageTime,
  OpponentAvatar,
  OpponentOnlineStatus,
  OpponentUserId,
  OpponentUsername,
} from '../store/slice';

export type Props = {
  conversationId: ConversationId;
  userId: OpponentUserId;
  avatar: OpponentAvatar;
  online?: OpponentOnlineStatus;
  username?: OpponentUsername;
  updateTime: LastMessageTime;
  content: LastMessageContent;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    navigation.push('ChatDetail', {conversationId: props.conversationId});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Avatar avatar={props.avatar} online={props.online} />

      <Content
        username={props.username}
        updateTime={props.updateTime}
        content={props.content}
        userId={props.userId}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
