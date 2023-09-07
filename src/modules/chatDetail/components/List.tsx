import React, {useEffect, useMemo, useRef} from 'react';
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

type Props = {
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentAvatar: OpponentAvatar;
  style: StyleProp<ViewStyle>;
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
    if (!messageList.length) {
      props.conversationId &&
        dispatch(
          getRecentChatMessagesAsync({conversationId: props.conversationId}),
        );

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList]);

  const data: ItemProps[] = messageList.map(message => {
    const isSelf = message.senderId === store.getState().user.userId;

    return {
      conversionId: message.conversationId,
      messageId: message.messageId,
      senderId: message.senderId,
      sentTime: message.sentTime,
      content: message.content,
      type: message.type,
      avatar: isSelf ? undefined : props.opponentAvatar,
      readStatus: message.readStatus,
      isSelf,
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
      ListHeaderComponent={<ListFooter tabBarHeight={90 + 60} />}
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