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

import Item, {Item as ItemProps} from './Item';
import Separator from './Separator';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getGiftListAsync,
  list,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {transformItemArray} from '../helper';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

const renderItem = ({item}: {item: ItemProps[]}) => <Item itemList={item} />;

const keyExtractor = (item: ItemProps[], index: number) =>
  `${item[0].id}-${item[1].id}-${index}`;

export default () => {
  const listValue = useAppSelector(list);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const refreshing = useMemo(() => statusValue === 'loading', [statusValue]);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(setScene('getGiftList'));

    dispatch(getGiftListAsync());
  }, [dispatch]);

  const load = useCallback(() => {
    if (statusValue === 'idle' || statusValue === 'loading') {
      return;
    }

    dispatch(setScene('getGiftList'));

    dispatch(getGiftListAsync());
  }, [dispatch, statusValue]);

  const data = transformItemArray(listValue);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getGiftList') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getGiftList') {
      dispatch(resetStatus());

      const {error} = store.getState().gift;

      showError(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
