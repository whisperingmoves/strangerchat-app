import React, {RefObject, useEffect, useMemo, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item, {Props as ItemProps} from './Item';

import Separator from './Separator';
import {ConversationId, OpponentAvatar} from '../../chat/store/slice';
import {getRecentChatMessagesAsync, messageMap} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import ListFooter from '../../../components/ListFooter';
import {isTimestampExpired} from '../../../utils/date';
import Config from 'react-native-config';
import {InputRef} from '../../../components/Input';

type Props = {
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentAvatar: OpponentAvatar;
  style: StyleProp<ViewStyle>;
  inputRef: RefObject<InputRef>;
};

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) => `${index}`;

export default (props: Props) => {
  const messageMapValue = useAppSelector(messageMap);

  const ref = useRef<FlatList>(null);

  const dispatch = useAppDispatch();

  const conversationId = (props.conversationId ||
    props.clientConversationId) as ConversationId;

  const messageList = useMemo(
    () => messageMapValue[conversationId] || [],
    [messageMapValue, conversationId],
  );

  useEffect(() => {
    props.conversationId &&
      dispatch(
        getRecentChatMessagesAsync({
          conversationId: props.conversationId,
          timestamp: messageList.length ? messageList[0].sentTime : undefined,
        }),
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data: ItemProps[] = messageList.map(message => {
    const isSelf = message.senderId === store.getState().user.userId;

    const sendStatus = message.sendStatus
      ? message.sendStatus
      : !message.messageId
      ? isTimestampExpired(
          message.sentTime,
          parseInt(Config.TIME_OUT as string, 10),
        )
        ? 1
        : 0
      : 0;

    return {
      conversationId: message.conversationId,
      messageId: message.messageId,
      clientMessageId: message.clientMessageId,
      senderId: message.senderId,
      sentTime: message.sentTime,
      content: message.content,
      type: message.type,
      avatar: isSelf ? undefined : props.opponentAvatar,
      readStatus: message.readStatus,
      sendStatus: sendStatus,
      isSelf,
      inputRef: props.inputRef,
    };
  });

  return (
    <FlatList
      style={styles.root}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={[styles.contentContainer, props.style]}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<ListFooter tabBarHeight={90} />}
      ref={ref}
      inverted
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
