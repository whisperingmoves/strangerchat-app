import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import ListEmpty from '../../components/ListEmpty';
import ListFooter from '../../components/ListFooter';
import Item, {Props as ItemProps} from '../giftNotification/components/Item';
import ListSeparator from '../../components/ListSeparator';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getGiftNotificationsAsync,
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
    () => statusValue === 'loading' && sceneValue === 'getGiftNotifications',
    [sceneValue, statusValue],
  );

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (statusValue === 'loading' && sceneValue === 'getGiftNotifications') {
      return;
    }

    dispatch(resetPage());

    dispatch(setScene('getGiftNotifications'));

    dispatch(getGiftNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  const load = useCallback(() => {
    if (
      (statusValue === 'idle' || statusValue === 'loading') &&
      sceneValue === 'getGiftNotifications'
    ) {
      return;
    }

    dispatch(setScene('getGiftNotifications'));

    dispatch(getGiftNotificationsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getGiftNotifications') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getGiftNotifications') {
      dispatch(resetStatus());

      const {error} = store.getState().interactiveNotification;

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
