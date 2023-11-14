import React, {useCallback, useEffect} from 'react';
import {
  getLatestPostsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import PostList from '../../postList/PostList';

type Props = {
  tabBarHeight: number;
};

export default (props: Props) => {
  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const listValue = useAppSelector(list);

  const data = listValue.map(item => {
    return {
      ...item,
      authorGender: '',
    };
  });

  const dispatch = useAppDispatch();

  const refresh = () => {
    dispatch(setScene('getLatestPosts'));

    dispatch(resetPage());

    dispatch(getLatestPostsAsync());
  };

  const load = useCallback(() => {
    if (
      (statusValue === 'loading' || statusValue === 'idle') &&
      sceneValue === 'getLatestPosts'
    ) {
      return;
    }

    dispatch(getLatestPostsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getLatestPosts') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getLatestPosts') {
      dispatch(resetStatus());

      const {error} = store.getState().search;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <PostList
      data={data}
      refreshing={statusValue === 'loading' && sceneValue === 'getLatestPosts'}
      refresh={refresh}
      load={load}
      isLatest={true}
      tabBarHeight={props.tabBarHeight}
    />
  );
};
