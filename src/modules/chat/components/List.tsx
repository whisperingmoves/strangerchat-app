import React, {useContext, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';

import Separator from './Separator';
import Footer from '../../../components/ListFooter';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  conversationList,
  getRecentChatConversationsAsync,
  keyword,
} from '../store/slice';
import {SocketContext} from '../../../contexts/SocketContext';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.content}-${index}`;

type Props = {
  tabBarHeight: number;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const conversationListValue = useAppSelector(conversationList);

  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (conversationListValue.length) {
      return;
    }

    dispatch(getRecentChatConversationsAsync({data: {}, socket}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationListValue]);

  const keywordValue = useAppSelector(keyword);

  const data: ItemProps[] = conversationListValue
    .filter(conversation =>
      keywordValue
        ? conversation.opponentUsername?.includes(keywordValue) ||
          conversation.lastMessageContent.includes(keywordValue)
        : true,
    )
    .filter(
      conversation =>
        conversation.lastMessageTime && conversation.lastMessageContent,
    )
    .map(conversation => {
      return {
        conversationId: conversation.conversationId,
        userId: conversation.opponentUserId,
        avatar: conversation.opponentAvatar,
        online: conversation.opponentOnlineStatus,
        username: conversation.opponentUsername,
        updateTime: conversation.lastMessageTime,
        content: conversation.lastMessageContent,
      };
    });

  return (
    <FlatList
      style={styles.root}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={props.style}
      ListFooterComponent={<Footer tabBarHeight={props.tabBarHeight} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
