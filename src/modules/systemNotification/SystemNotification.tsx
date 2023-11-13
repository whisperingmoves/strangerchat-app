import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';
import ListFooter from '../../components/ListFooter';
import ListEmpty from '../../components/ListEmpty';
import ListSeparator from '../../components/ListSeparator';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getSystemNotificationsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from './store/slice';
import {store} from '../../stores/store';
import {showError} from '../../utils/notification';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.notificationId}-${index}`;

const renderListSeparator = () => (
  <ListSeparator style={styles.listSeparator} />
);

export default () => {
  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const refreshing = useMemo(
    () => statusValue === 'loading' && sceneValue === 'getSystemNotifications',
    [sceneValue, statusValue],
  );

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (statusValue === 'loading' && sceneValue === 'getSystemNotifications') {
      return;
    }

    dispatch(resetPage());

    dispatch(setScene('getSystemNotifications'));

    dispatch(getSystemNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  const load = useCallback(() => {
    if (
      (statusValue === 'idle' || statusValue === 'loading') &&
      sceneValue === 'getSystemNotifications'
    ) {
      return;
    }

    dispatch(setScene('getSystemNotifications'));

    dispatch(getSystemNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getSystemNotifications') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getSystemNotifications') {
      dispatch(resetStatus());

      const {error} = store.getState().systemNotification;

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
    marginTop: 28,
    paddingHorizontal: 20,
  },
  listSeparator: {
    height: 32,
  },
});

const bounces = Platform.OS === 'ios';
