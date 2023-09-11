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
import {sendMessageAsync, setScene, setSentMessage, Type} from '../store/slice';
import {socket} from '../../../apis/socket';

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

  const handleSend = (value: string, type?: Type) => {
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
