import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './AtUserItem';
import {useAppSelector} from '../../../hooks';
import {conversationList} from '../../chat/store/slice';
import {checkedAtUsers, keyword} from '../store/slice';
import ListFooter from '../../../components/ListFooter';
import ListSeparator from '../../../components/ListSeparator';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.userId}-${index}`;

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const conversationListValue = useAppSelector(conversationList);

  const keywordValue = useAppSelector(keyword);

  const checkedAtUsersValue = useAppSelector(checkedAtUsers);

  const data: ItemProps[] = conversationListValue
    .filter(conversation =>
      keywordValue
        ? conversation.opponentUsername?.includes(keywordValue)
        : true,
    )
    .filter(
      conversation =>
        conversation.lastMessageTime && conversation.lastMessageContent,
    )
    .map(conversation => {
      let isChecked = false;

      const existingUserIndex = checkedAtUsersValue.findIndex(
        user => user.userId === conversation.opponentUserId,
      );

      if (existingUserIndex !== -1) {
        isChecked = true;
      }

      return {
        userId: conversation.opponentUserId,
        avatar: conversation.opponentAvatar,
        username: conversation.opponentUsername,
        isChecked,
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
      ListFooterComponent={<ListFooter tabBarHeight={30} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
