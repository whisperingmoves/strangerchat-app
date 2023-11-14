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
      isFollowing: true,
      authorGender: '',
    };
  });

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getFollowedPostsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = useCallback(() => {
    if (statusValue === 'loading' || statusValue === 'idle') {
      return;
    }

    dispatch(getFollowedPostsAsync());
  }, [dispatch, statusValue]);

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

      const {error} = store.getState().following;

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
      isFollowing={true}
      tabBarHeight={tabBarHeight}
    />
  );
};
