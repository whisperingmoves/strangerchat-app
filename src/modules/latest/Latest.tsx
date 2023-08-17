import React, {useCallback, useEffect} from 'react';
import PostList from '../postList/PostList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {
  getLatestPostsAsync,
  list,
  resetPage,
  resetStatus,
  status,
} from './store/slice';

export default () => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getLatestPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    dispatch(getLatestPostsAsync());
  };

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      const {error} = store.getState().latest;

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
      isLatest={true}
    />
  );
};
