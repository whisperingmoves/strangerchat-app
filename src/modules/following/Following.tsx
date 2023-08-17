import React, {useCallback, useEffect} from 'react';
import PostList from '../postList/PostList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {getFollowedPostsAsync, list, resetPage, status} from './store/slice';

export default () => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getFollowedPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    dispatch(getFollowedPostsAsync());
  };

  useEffect(() => {
    if (statusValue === 'idle') {
      refresh();
    } else if (statusValue === 'failed') {
      const {error} = store.getState().home;

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
    />
  );
};
