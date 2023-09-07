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

type Props = {tabBarHeight: number};

export default (props: Props) => {
  const {tabBarHeight} = props;

  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const data = listValue.map(item => {
    return {
      ...item,
      isLatest: true,
    };
  });

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
      data={data}
      refreshing={statusValue === 'loading'}
      refresh={refresh}
      load={load}
      isLatest={true}
      tabBarHeight={tabBarHeight}
    />
  );
};
