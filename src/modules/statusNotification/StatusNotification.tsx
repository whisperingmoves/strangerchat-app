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

import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import ListEmpty from '../../components/ListEmpty';
import ListFooter from '../../components/ListFooter';
import ListSeparator from '../../components/ListSeparator';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getStatusNotificationsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from './store/slice';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';
import Item, {Props as ItemProps} from './components/Item';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: any, index: number) => `${index}`;

const renderListSeparator = () => (
  <ListSeparator style={styles.listSeparator} />
);

export default () => {
  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const refreshing = useMemo(
    () => statusValue === 'loading' && sceneValue === 'getStatusNotifications',
    [sceneValue, statusValue],
  );

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (statusValue === 'loading' && sceneValue === 'getStatusNotifications') {
      return;
    }

    dispatch(resetPage());

    dispatch(setScene('getStatusNotifications'));

    dispatch(getStatusNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  const load = useCallback(() => {
    if (
      (statusValue === 'idle' || statusValue === 'loading') &&
      sceneValue === 'getStatusNotifications'
    ) {
      return;
    }

    dispatch(setScene('getStatusNotifications'));

    dispatch(getStatusNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getStatusNotifications') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getStatusNotifications') {
      dispatch(resetStatus());

      const {error} = store.getState().statusNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <FlatList
      style={styles.root}
      data={listValue}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderListSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<ListFooter tabBarHeight={60} />}
      refreshing={refreshing}
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
      bounces={bounces}
      ListEmptyComponent={ListEmpty}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  listSeparator: {
    height: 32,
  },
});

const bounces = Platform.OS === 'ios';
