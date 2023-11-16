import React, {useCallback, useEffect, useMemo} from 'react';
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
import {
  getUserDetailAsync,
  getUserPostsAsync as getProfilePostsAsync,
  list as profilePostList,
  resetPage as resetProfilePage,
  resetStatus as resetProfileStatus,
  scene as profileScene,
  setScene as setProfileScene,
  status as profileStatus,
  UserId,
} from './store/slice';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {Route} from '@react-navigation/native';
import ListFooter from '../../components/ListFooter';
import {UserIdContext} from './context/UserIdContext';
import {
  TabBarHeight,
  TabBarHeightContext,
} from '../../contexts/TabBarHeightContext';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.postId}-${index}`;

type Props = {
  route: Route<
    string,
    {tabBarHeight: TabBarHeight; profileUserIdValue?: UserId}
  >;
};

export default (props: Props) => {
  const {tabBarHeight, profileUserIdValue} = props.route.params;

  const myPostListValue = useAppSelector(myPostList);

  const userStatusValue = useAppSelector(userStatus);

  const userSceneValue = useAppSelector(userScene);

  const profilePostListValue = useAppSelector(profilePostList);

  const profileStatusValue = useAppSelector(profileStatus);

  const profileSceneValue = useAppSelector(profileScene);

  const dispatch = useAppDispatch();

  const refreshUser = useCallback(() => {
    dispatch(resetUserPage());

    dispatch(setUserScene('getMyPosts'));

    dispatch(getMyPostsAsync());
  }, [dispatch]);

  const loadUser = useCallback(() => {
    if (userStatusValue === 'loading' || userStatusValue === 'idle') {
      return;
    }

    dispatch(setUserScene('getMyPosts'));

    dispatch(getMyPostsAsync());
  }, [dispatch, userStatusValue]);

  const refreshProfile = useCallback(() => {
    dispatch(resetProfilePage());

    dispatch(setProfileScene('getUserPosts'));

    dispatch(getProfilePostsAsync(profileUserIdValue as UserId));
  }, [dispatch, profileUserIdValue]);

  const loadProfile = useCallback(() => {
    if (profileStatusValue === 'loading' || profileStatusValue === 'idle') {
      return;
    }

    dispatch(setProfileScene('getUserPosts'));

    dispatch(getProfilePostsAsync(profileUserIdValue as UserId));
  }, [dispatch, profileStatusValue, profileUserIdValue]);

  const refresh = useMemo(
    () => (profileUserIdValue ? refreshProfile : refreshUser),
    [refreshProfile, refreshUser, profileUserIdValue],
  );

  const load = useMemo(
    () => (profileUserIdValue ? loadProfile : loadUser),
    [loadProfile, loadUser, profileUserIdValue],
  );

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!profileUserIdValue) {
      return;
    }

    dispatch(setProfileScene('getUserDetail'));

    dispatch(getUserDetailAsync(profileUserIdValue));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUserIdValue]);

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

  useEffect(() => {
    if (profileStatusValue === 'success') {
      dispatch(resetProfileStatus());

      return;
    }

    if (profileStatusValue === 'failed') {
      dispatch(resetProfileStatus());

      const {error} = store.getState().profile;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileStatusValue]);

  const list = useMemo(
    () => (profileUserIdValue ? profilePostListValue : myPostListValue),
    [myPostListValue, profilePostListValue, profileUserIdValue],
  );

  const refreshing = useMemo(
    () =>
      profileUserIdValue
        ? profileStatusValue === 'loading' &&
          profileSceneValue === 'getUserPosts'
        : userStatusValue === 'loading' && userSceneValue === 'getMyPosts',
    [
      profileSceneValue,
      profileStatusValue,
      profileUserIdValue,
      userSceneValue,
      userStatusValue,
    ],
  );

  return (
    <UserIdContext.Provider value={profileUserIdValue as UserId}>
      <TabBarHeightContext.Provider value={tabBarHeight}>
        <FlatList
          style={styles.root}
          data={list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={<Header style={styles.header} />}
          ListFooterComponent={<ListFooter tabBarHeight={tabBarHeight} />}
          refreshing={refreshing}
          onRefresh={refresh}
          onEndReachedThreshold={0.1}
          onEndReached={load}
        />
      </TabBarHeightContext.Provider>
    </UserIdContext.Provider>
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
