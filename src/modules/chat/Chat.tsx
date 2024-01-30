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

import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Header from './components/Header';
import Search from '../../components/Search';
import FAB from './components/FAB';
import List from './components/List';
import {keyword, setKeyword} from './store/slice';
import {useAppDispatch, useAppSelector} from '../../hooks';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const dispatch = useAppDispatch();

  const handleChangeText = useCallback(
    (text: string) => {
      dispatch(setKeyword(text));
    },
    [dispatch],
  );

  const keywordValue = useAppSelector(keyword);

  return (
    <View style={[styles.root, statusBarStyle]}>
      <Header />

      <Search
        style={styles.search}
        onChangeText={handleChangeText}
        text={keywordValue}
      />

      <List style={styles.list} />

      <FAB style={styles.fab} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  search: {
    marginTop: 22,
  },
  list: {
    marginTop: 36,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
});
