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

import React, {useCallback, useEffect} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Item, {Props as ItemProps} from './Item';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  getStoryListAsync,
  list,
  resetPage,
  resetStatus,
  status,
} from '../store/slice';
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

  const load = useCallback(() => {
    if (statusValue === 'loading' || statusValue === 'idle') {
      return;
    }

    dispatch(getStoryListAsync());
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

      const {error} = store.getState().home;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

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
      bounces={bounces}
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

const bounces = Platform.OS === 'ios';
