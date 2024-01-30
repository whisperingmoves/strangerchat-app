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
import {TabBarHeight} from '../../../contexts/TabBarHeightContext';

type Props = {
  tabBarHeight: TabBarHeight;
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
  }, [statusValue]);

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
