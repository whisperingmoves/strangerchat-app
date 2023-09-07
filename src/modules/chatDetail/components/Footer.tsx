import React from 'react';
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
import {sendMessageAsync, setSentMessage} from '../store/slice';

type Props = {
  style: ViewStyle;
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentUserId: OpponentUserId;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const userId = store.getState().user.userId;

  const handleSend = (value: string) => {
    const clientMessageId = generateUniqueId();

    const currentTimestamp = getCurrentUnixTimestampInSeconds();

    const message: SentMessage = {
      conversationId: props.conversationId || props.clientConversationId || '',
      clientMessageId,
      messageId: '',
      senderId: userId,
      recipientId: props.opponentUserId,
      content: value,
      sentTime: currentTimestamp,
    };

    dispatch(setSentMessage(message));

    dispatch(
      setConversation({
        clientConversationId: props.clientConversationId,
        conversationId: props.conversationId,
        lastMessageTime: currentTimestamp,
        lastMessageContent: value,
      }),
    );

    if (!props.conversationId) {
      return;
    }

    dispatch(
      sendMessageAsync({
        conversationId: props.conversationId as ConversationId,
        clientMessageId: clientMessageId,
        opponentUserId: props.opponentUserId,
        content: value,
      }),
    );
  };

  return (
    <View style={[styles.root, props.style]}>
      <Input onSend={handleSend} />

      <ButtonGroup style={styles.btnGroup} />
    </View>
  );
};

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
