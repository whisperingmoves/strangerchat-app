import React, {useCallback, useEffect} from 'react';
import PostList from '../postList/PostList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {
  getLocationAsync,
  getRecommendedPostsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from './store/slice';

export default () => {
  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getRecommendedPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    dispatch(getRecommendedPostsAsync());
  };

  useEffect(() => {
    dispatch(setScene('getLocation'));

    dispatch(getLocationAsync());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getLocation') {
      dispatch(resetStatus());

      refresh();

      return;
    }

    if (statusValue === 'success' && sceneValue === 'getRecommendedPosts') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      const {error} = store.getState().recommend;

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
      isRecommend={true}
    />
  );
};
