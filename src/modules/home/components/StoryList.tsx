import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getStoryListAsync, list, resetPage, status} from '../store/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import Separator from './Separator';

type Props = {
  style: StyleProp<ViewStyle>;
};

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) => `${item}-${index}`;

export default (props: Props) => {
  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(getStoryListAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = () => {
    dispatch(getStoryListAsync());
  };

  useEffect(() => {
    if (statusValue === 'idle') {
      refresh();
    } else if (statusValue === 'failed') {
      const {error} = store.getState().home;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <FlatList
      style={[styles.root, props.style]}
      horizontal={true}
      contentContainerStyle={styles.containerStyle}
      showsHorizontalScrollIndicator={false}
      data={listValue}
      refreshing={statusValue === 'loading'}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={keyExtractor}
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerStyle: {
    paddingHorizontal: 20,
  },
});
