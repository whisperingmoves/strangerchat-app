import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item, {Props as ItemProps} from './Item';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getCoinProductsAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import Separator from './Separator';
import Footer from './Footer';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

type Props = {
  style: StyleProp<ViewStyle>;
  hideTopUp: () => void;
};

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.productId}-${index}`;

export default (props: Props) => {
  const listValue = useAppSelector(list);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(setScene('getCoinProducts'));

    dispatch(resetPage());

    dispatch(getCoinProductsAsync());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = useCallback(() => {
    if (
      (statusValue === 'loading' || statusValue === 'idle') &&
      sceneValue === 'getCoinProducts'
    ) {
      return;
    }

    dispatch(setScene('getCoinProducts'));

    dispatch(getCoinProductsAsync());
  }, [dispatch, sceneValue, statusValue]);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getCoinProducts') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getCoinProducts') {
      dispatch(resetStatus());

      const {error} = store.getState().topUp;

      showError(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const data = useMemo(
    () =>
      listValue.map(item => {
        return {
          ...item,
          hideTopUp: props.hideTopUp,
        };
      }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listValue],
  );

  return (
    <FlatList
      style={[styles.root, props.style]}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      refreshing={statusValue === 'loading' && sceneValue === 'getCoinProducts'}
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
      bounces={bounces}
      ListFooterComponent={<Footer style={styles.footer} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  footer: {
    marginTop: 12,
  },
});

const bounces = Platform.OS === 'ios';
