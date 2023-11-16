import React, {useContext} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';

import Footer from '../../../components/ListFooter';
import {useAppSelector} from '../../../hooks';
import {conversationList, keyword} from '../store/slice';
import {IMAGE, VOICE} from '../../../constants/chatDetail/Config';
import {GIFT} from '../../../constants/Config';
import ListSeparator from '../../../components/ListSeparator';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.content}-${index}`;

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const tabBarHeight = useContext(TabBarHeightContext);

  const conversationListValue = useAppSelector(conversationList);

  const keywordValue = useAppSelector(keyword);

  const data: ItemProps[] = conversationListValue
    .filter(conversation =>
      keywordValue
        ? conversation.opponentUsername?.includes(keywordValue) ||
          (conversation.lastMessageContent.includes(keywordValue) &&
            !conversation.lastMessageType)
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
      } else if (conversation.lastMessageType === 5) {
        content = `[${GIFT}]`;
      } else if (conversation.lastMessageType === 1) {
        content = `[${VOICE}]`;
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
      ItemSeparatorComponent={ListSeparator}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={props.style}
      ListFooterComponent={<Footer tabBarHeight={tabBarHeight} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
