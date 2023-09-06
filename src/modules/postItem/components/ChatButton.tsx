import React, {useContext} from 'react';
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
import {generateUniqueId} from '../../../utils/idGenerator';
import {SocketContext} from '../../../contexts/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentUserId: OpponentUserId;
  opponentAvatar: OpponentAvatar;
  opponentUsername?: OpponentUsername;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

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
        }),
      );

      dispatch(
        createChatConversationAsync({
          data: {
            clientConversationId,
            opponentUserId: props.opponentUserId,
          },
          socket,
        }),
      );

      navigation.push('ChatDetail', {clientConversationId});
    } else {
      dispatch(
        getChatConversationDetailsAsync({
          data: {
            conversationId: props.conversationId,
          },
          socket,
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
