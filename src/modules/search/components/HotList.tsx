import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';
import Separator from './Separator';
import Header from './ListHeader';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getHotPostsAsync,
  hotPostList,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {HotPost} from '../../../apis/post/getHotPosts';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const hotPostListValue = useAppSelector(hotPostList);

  const data = hotPostListValue.map((post: HotPost, index: number) => ({
    ...post,
    number: index + 1,
  }));

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(setScene('getHotPosts'));

    dispatch(getHotPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getHotPosts') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getHotPosts') {
      dispatch(resetStatus());

      const {error} = store.getState().search;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={styles.root}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={Header}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={props.style}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
