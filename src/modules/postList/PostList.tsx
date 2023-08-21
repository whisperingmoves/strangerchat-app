import React from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from '../postItem/PostItem';

import Separator from './components/Separator';

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.postId}-${index}`;

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

type Props = {
  data: ItemProps[];
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  showCollect?: boolean;
  refreshing: boolean;
  refresh: () => void;
  load: () => void;
};

export default (props: Props) => {
  return (
    <FlatList
      style={styles.root}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      refreshing={props.refreshing}
      onRefresh={props.refresh}
      onEndReachedThreshold={0.1}
      onEndReached={props.load}
      bounces={bounces}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
});

const bounces = Platform.OS === 'ios';
