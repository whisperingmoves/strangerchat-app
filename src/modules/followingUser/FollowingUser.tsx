// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, {useCallback, useContext, useEffect} from 'react';

import UserList from '../userList/UserList';
import {
  getFollowingUsersAsync,
  keyword,
  list,
  resetPage,
  resetStatus,
  status,
} from './store/slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import {TabBarHeightContext} from '../../contexts/TabBarHeightContext';

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

    dispatch(getFollowingUsersAsync());
  }, [dispatch, statusValue]);

  const load = useCallback(() => {
    if (statusValue === 'idle' || statusValue === 'loading') {
      return;
    }

    dispatch(getFollowingUsersAsync());
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

      const {error} = store.getState().followingUser;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const tabBarHeight = useContext(TabBarHeightContext);

  return (
    <UserList
      data={listValue}
      refreshing={statusValue === 'loading'}
      refresh={refresh}
      load={load}
      tabBarHeight={tabBarHeight}
    />
  );
};
