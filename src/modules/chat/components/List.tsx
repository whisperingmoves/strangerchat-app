import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';

import Separator from './Separator';
import Footer from '../../../components/ListFooter';
import {useAppSelector} from '../../../hooks';
import {conversationList, keyword} from '../store/slice';
import {IMAGE} from '../../../constants/chatDetail/Config';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.content}-${index}`;

type Props = {
  tabBarHeight: number;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const conversationListValue = useAppSelector(conversationList);

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
      let content = conversation.lastMessageContent;

      if (conversation.lastMessageType === 2) {
        content = `[${IMAGE}]`;
      }

      return {
        conversationId: conversation.conversationId,
        clientConversationId: conversation.clientConversationId,
        userId: conversation.opponentUserId,
        avatar: conversation.opponentAvatar,
        online: conversation.opponentOnlineStatus,
        username: conversation.opponentUsername,
        updateTime: conversation.lastMessageTime,
        content,
        unreadCount: conversation.unreadCount,
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
