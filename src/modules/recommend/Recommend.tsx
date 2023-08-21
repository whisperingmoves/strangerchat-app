import React, {useCallback, useEffect} from 'react';
import PostList from '../postList/PostList';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {
  getRecommendedPostsAsync,
  list,
  resetPage,
  resetStatus,
  status,
} from './store/slice';

export default () => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const data = listValue.map(item => {
    return {
      ...item,
      isRecommend: true,
    };
  });

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

      const {error} = store.getState().recommend;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <PostList
      data={data}
      refreshing={statusValue === 'loading'}
      refresh={refresh}
      load={load}
      isRecommend={true}
    />
  );
};
