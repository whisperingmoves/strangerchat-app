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
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CHAT} from '../../../constants/Config';
import {ConversationId} from '../../following/store/slice';
import {useAppDispatch} from '../../../hooks';
import {
  createChatConversationAsync,
  getChatConversationDetailsAsync,
  OpponentAvatar,
  OpponentUserId,
  OpponentUsername,
  setCreatedConversation,
} from '../../chat/store/slice';
import {generateUniqueId} from '../../../utils/id';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IsBlocked, IsFollowed} from '../../recommend/store/slice';

type Props = {
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentUserId: OpponentUserId;
  opponentAvatar: OpponentAvatar;
  opponentUsername?: OpponentUsername;
  isFollowed?: IsFollowed;
  isBlocked?: IsBlocked;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    if (!props.conversationId) {
      const clientConversationId = props.clientConversationId
        ? props.clientConversationId
        : generateUniqueId();

      dispatch(
        setCreatedConversation({
          clientConversationId,
          conversationId: '',
          opponentUserId: props.opponentUserId,
          opponentAvatar: props.opponentAvatar,
          opponentUsername: props.opponentUsername,
          isFollowed: props.isFollowed,
          isBlocked: props.isBlocked,
        }),
      );

      dispatch(
        createChatConversationAsync({
          clientConversationId,
          opponentUserId: props.opponentUserId,
        }),
      );

      navigation.push('ChatDetail', {clientConversationId});
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
      <Text style={styles.txt}>{CHAT}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 52,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#8B5CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#8B5CFF',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
