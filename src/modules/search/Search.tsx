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

import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Route, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import HotList from './components/HotList';
import Header from './components/Header';
import SearchList from './components/SearchList';
import {useAppSelector} from '../../hooks';
import {keyword} from './store/slice';

type Props = {
  route: Route<string, {tabBarHeight: number}>;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const insets = useSafeAreaInsets();

  const keywordValue = useAppSelector(keyword);

  const {tabBarHeight} = props.route.params;

  const inputRef = useRef<TextInput>(null);

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const handlePress = () => {
    inputRef.current?.blur();

    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  return (
    <View style={[styles.root, statusBarStyle]}>
      <Header
        onPress={handlePress}
        keyword={keywordValue}
        inputRef={inputRef}
      />

      {keywordValue ? (
        <SearchList tabBarHeight={tabBarHeight} />
      ) : (
        <HotList style={styles.hotList} />
      )}
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
  hotList: {
    marginTop: 30,
  },
});
