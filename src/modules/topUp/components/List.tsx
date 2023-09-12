import React, {useCallback} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item, {Props as ItemProps} from './Item';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getCoinProductsAsync,
  list,
  resetPage,
  scene,
  setScene,
  status,
} from '../store/slice';
import Separator from './Separator';
import Footer from './Footer';

type Props = {
  style: StyleProp<ViewStyle>;
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

  const load = () => {
    if (statusValue === 'loading' && sceneValue === 'getCoinProducts') {
      return;
    }

    dispatch(setScene('getCoinProducts'));

    dispatch(getCoinProductsAsync());
  };

  return (
    <FlatList
      style={[styles.root, props.style]}
      showsVerticalScrollIndicator={false}
      data={listValue}
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
