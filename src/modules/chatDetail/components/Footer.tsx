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

import React, {forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Input from '../../../components/Input';
import ButtonGroup from './ButtonGroup';
import {
  ConversationId,
  OpponentUserId,
  setConversation,
} from '../../chat/store/slice';
import {generateUniqueId} from '../../../utils/id';
import {useAppDispatch} from '../../../hooks';
import {SentMessage} from '../../../apis/notification/sentMessage';
import {store} from '../../../stores/store';
import {getCurrentUnixTimestampInSeconds} from '../../../utils/date';
import {
  Content,
  ContentLength,
  HandleSend,
  sendMessageAsync,
  setScene,
  setSentMessage,
  Type,
} from '../store/slice';
import {socket} from '../../../apis/socket';
import {Id} from '../../gift/store/slice';

type Props = {
  style: ViewStyle;
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentUserId: OpponentUserId;
  blurInput: () => void;
};

export default forwardRef((props: Props, ref) => {
  const dispatch = useAppDispatch();

  const userId = store.getState().user.userId;

  const handleSend: HandleSend = (
    value: Content,
    type?: Type,
    giftId?: Id,
    contentLength?: ContentLength,
  ) => {
    const clientMessageId = generateUniqueId();

    const currentTimestamp = getCurrentUnixTimestampInSeconds();

    const message: SentMessage = {
      conversationId: (props.conversationId ||
        props.clientConversationId) as ConversationId,
      clientMessageId,
      messageId: '',
      senderId: userId,
      recipientId: props.opponentUserId,
      content: value,
      sentTime: currentTimestamp,
      type,
      contentLength,
    };

    dispatch(
      setConversation({
        clientConversationId: props.clientConversationId,
        conversationId: props.conversationId,
        lastMessageTime: currentTimestamp,
        lastMessageContent: value,
        lastMessageType: type,
      }),
    );

    if (!props.conversationId || !socket.connected) {
      message.sendStatus = 1;

      dispatch(setSentMessage(message));

      return;
    }

    dispatch(setSentMessage(message));

    dispatch(setScene('sendMessage'));

    dispatch(
      sendMessageAsync({
        conversationId: props.conversationId as ConversationId,
        clientMessageId: clientMessageId,
        opponentUserId: props.opponentUserId,
        content: value,
        type,
        giftId,
        contentLength,
      }),
    );
  };

  return (
    <View style={[styles.root, props.style]}>
      <Input onSend={handleSend} ref={ref} />

      <ButtonGroup
        style={styles.btnGroup}
        handleSend={handleSend}
        blurInput={props.blurInput}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 16,
    paddingTop: 10,
    paddingBottom: 22,
    borderColor: '#F1F0F3',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
  btnGroup: {
    paddingHorizontal: 10,
  },
});
