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

import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item from './components/Item';
import ListFooter from '../../components/ListFooter';
import Header from './components/WalletHeader';
import ListSeparator from '../../components/ListSeparator';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getCoinTransactionsAsync,
  list,
  resetPage,
  resetStatus,
  status,
} from './store/slice';
import {TransactionData} from '../../apis/transaction/getCoinTransactions';
import {showError} from '../../utils/notification';
import {store} from '../../stores/store';

const renderItem = ({item}: {item: TransactionData}) => <Item {...item} />;

const keyExtractor = (item: TransactionData, index: number) =>
  `${item.id}-${index}`;

export default () => {
  const renderSeparator = useCallback(() => {
    return <ListSeparator style={styles.separator} />;
  }, []);

  const listRef = useRef<FlatList>(null);

  const scrollToListItem = useCallback(() => {
    listRef.current?.scrollToOffset({animated: true, offset: 350});
  }, []);

  const listValue = useAppSelector(list);

  const statusValue = useAppSelector(status);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    if (statusValue === 'loading') {
      return;
    }

    dispatch(resetPage());

    dispatch(getCoinTransactionsAsync());
  }, [dispatch, statusValue]);

  const load = useCallback(() => {
    if (statusValue === 'loading' || statusValue === 'idle') {
      return;
    }

    dispatch(getCoinTransactionsAsync());
  }, [dispatch, statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed') {
      dispatch(resetStatus());

      showError(store.getState().wallet.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <FlatList
      style={styles.root}
      data={listValue}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={
        <Header style={styles.header} scrollToListItem={scrollToListItem} />
      }
      ListFooterComponent={<ListFooter tabBarHeight={46} />}
      ref={listRef}
      refreshing={statusValue === 'loading'}
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
  separator: {
    height: 30,
  },
  header: {
    marginBottom: 30,
  },
});

const bounces = Platform.OS === 'ios';
