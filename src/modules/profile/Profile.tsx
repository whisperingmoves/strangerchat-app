import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';
import Separator from './components/Separator';
import Header from './components/ProfileHeader';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getMyPostsAsync,
  list as myPostList,
  resetPage as resetUserPage,
  resetStatus as resetUserStatus,
  scene as userScene,
  setScene as setUserScene,
  status as userStatus,
} from '../../stores/user/slice';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {Route} from '@react-navigation/native';
import ListFooter from '../../components/ListFooter';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.postId}-${index}`;

type Props = {
  route: Route<string, {tabBarHeight: number}>;
};

export default (props: Props) => {
  const {tabBarHeight} = props.route.params;

  const myPostListValue = useAppSelector(myPostList);

  const userStatusValue = useAppSelector(userStatus);

  const userSceneValue = useAppSelector(userScene);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetUserPage());

    dispatch(setUserScene('getMyPosts'));

    dispatch(getMyPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    if (userStatusValue === 'loading') {
      return;
    }

    dispatch(setUserScene('getMyPosts'));

    dispatch(getMyPostsAsync());
  };

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userStatusValue === 'success' && userSceneValue === 'getMyPosts') {
      dispatch(resetUserStatus());

      return;
    }

    if (userStatusValue === 'failed' && userSceneValue === 'getMyPosts') {
      dispatch(resetUserStatus());

      const {error} = store.getState().user;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatusValue]);

  return (
    <FlatList
      style={styles.root}
      data={myPostListValue}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={<Header style={styles.header} />}
      ListFooterComponent={<ListFooter tabBarHeight={tabBarHeight} />}
      refreshing={
        userStatusValue === 'loading' && userSceneValue === 'getMyPosts'
      }
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    marginBottom: 30,
  },
});
