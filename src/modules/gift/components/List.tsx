import React, {useCallback, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Item as ItemProps} from './Item';
import Separator from './Separator';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getGiftListAsync, list, status} from '../store/slice';
import {transformItemArray} from '../helper';
import {resetPage} from '../../latest/store/slice';

const renderItem = ({item}: {item: ItemProps[]}) => <Item itemList={item} />;

const keyExtractor = (item: ItemProps[], index: number) =>
  `${item[0].id}-${item[1].id}-${index}`;

export default () => {
  const listValue = useAppSelector(list);

  const statusValue = useAppSelector(status);

  const refreshing = useMemo(() => statusValue === 'loading', [statusValue]);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getGiftListAsync());
  }, [dispatch]);

  const load = useCallback(() => {
    dispatch(getGiftListAsync());
  }, [dispatch]);

  const data = transformItemArray(listValue);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={keyExtractor}
      horizontal={true}
      ItemSeparatorComponent={Separator}
      refreshing={refreshing}
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
      bounces={bounces}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingVertical: 30,
    paddingHorizontal: 18,
  },
});

const bounces = Platform.OS === 'ios';
