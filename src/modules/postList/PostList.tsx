import React, {useCallback} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from '../postItem/PostItem';

import Separator from './components/Separator';

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.authorId}-${index}`;

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
  const renderItem = useCallback(
    ({item}: {item: ItemProps}) => {
      item.isFollowing = props.isFollowing;
      item.isRecommend = props.isRecommend;
      item.isLatest = props.isLatest;
      item.showCollect = props.showCollect;

      return <Item {...item} />;
    },
    [props.isFollowing, props.isRecommend, props.isLatest, props.showCollect],
  );

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
