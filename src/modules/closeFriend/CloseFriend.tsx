import React, {useCallback, useEffect} from 'react';

import UserList from '../userList/UserList';
import {
  getFriendsAsync,
  keyword,
  list,
  resetPage,
  resetStatus,
  status,
} from './store/slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';

export default () => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const keywordValue = useAppSelector(keyword);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (statusValue === 'loading') {
      return;
    }

    dispatch(resetPage());

    dispatch(getFriendsAsync());
  }, [dispatch, statusValue]);

  const load = useCallback(() => {
    if (statusValue === 'idle' || statusValue === 'loading') {
      return;
    }

    dispatch(getFriendsAsync());
  }, [dispatch, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordValue]);

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      const {error} = store.getState().closeFriend;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <UserList
      data={listValue}
      refreshing={statusValue === 'loading'}
      refresh={refresh}
      load={load}
      tabBarHeight={56}
    />
  );
};
