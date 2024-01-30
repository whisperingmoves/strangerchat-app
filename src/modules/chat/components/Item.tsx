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
import {StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Content from './Content';
import Avatar from './Avatar';
import {
  ConversationId,
  createChatConversationAsync,
  getChatConversationDetailsAsync,
  LastMessageContent,
  LastMessageTime,
  OpponentAvatar,
  OpponentOnlineStatus,
  OpponentUserId,
  OpponentUsername,
  UnreadCount,
} from '../store/slice';
import {useAppDispatch} from '../../../hooks';

export type Props = {
  conversationId: ConversationId;
  clientConversationId?: ConversationId;
  userId: OpponentUserId;
  avatar: OpponentAvatar;
  online?: OpponentOnlineStatus;
  username?: OpponentUsername;
  updateTime: LastMessageTime;
  content: LastMessageContent;
  unreadCount?: UnreadCount;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (!props.conversationId) {
      dispatch(
        createChatConversationAsync({
          clientConversationId: props.clientConversationId as ConversationId,
          opponentUserId: props.userId,
        }),
      );

      navigation.push('ChatDetail', {
        clientConversationId: props.clientConversationId as ConversationId,
      });
    } else {
      dispatch(
        getChatConversationDetailsAsync({
          conversationId: props.conversationId,
        }),
      );

      navigation.push('ChatDetail', {conversationId: props.conversationId});
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Avatar
        userId={props.userId}
        avatar={props.avatar}
        online={props.online}
        unreadCount={props.unreadCount}
      />

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
