import React, {useCallback, useEffect} from 'react';
import PostList from '../postList/PostList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {
  getFollowedPostsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from './store/slice';

export default () => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(setScene('getFollowedPosts'));

    dispatch(getFollowedPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    dispatch(setScene('getFollowedPosts'));

    dispatch(getFollowedPostsAsync());
  };

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getFollowedPosts') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getFollowedPosts') {
      dispatch(resetStatus());

      const {error} = store.getState().following;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <PostList
      data={listValue}
      refreshing={statusValue === 'loading'}
      refresh={refresh}
      load={load}
      isFollowing={true}
    />
  );
};
