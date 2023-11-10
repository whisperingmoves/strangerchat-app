import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';

import ListFooter from '../../components/ListFooter';
import ListSeparator from '../../components/ListSeparator';
import ListEmpty from '../../components/ListEmpty';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getInteractionNotificationsAsync,
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
    () =>
      statusValue === 'loading' && sceneValue === 'getInteractionNotifications',
    [sceneValue, statusValue],
  );

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (
      statusValue === 'loading' &&
      sceneValue === 'getInteractionNotifications'
    ) {
      return;
    }

    dispatch(resetPage());

    dispatch(setScene('getInteractionNotifications'));

    dispatch(getInteractionNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  const load = useCallback(() => {
    if (
      (statusValue === 'idle' || statusValue === 'loading') &&
      sceneValue === 'getInteractionNotifications'
    ) {
      return;
    }

    dispatch(setScene('getInteractionNotifications'));

    dispatch(getInteractionNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'getInteractionNotifications'
    ) {
      dispatch(resetStatus());

      return;
    }

    if (
      statusValue === 'failed' &&
      sceneValue === 'getInteractionNotifications'
    ) {
      dispatch(resetStatus());

      const {error} = store.getState().interactiveNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <FlatList
      style={styles.root}
      data={listValue}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderListSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.contentContainer]}
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
