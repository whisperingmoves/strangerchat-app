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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Search from './components/Search';
import NavigationBar from './components/NavigationBar';
import DetailHeader from '../../components/DetailHeader';
import {FOLLOWING} from '../../constants/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {Route, useNavigation} from '@react-navigation/native';
import {
  TabBarHeight,
  TabBarHeightContext,
} from '../../contexts/TabBarHeightContext';

type Props = {
  route: Route<string, {tabBarHeight: TabBarHeight}>;
};

export default (props: Props) => {
  const {tabBarHeight} = props.route.params;

  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <TabBarHeightContext.Provider value={tabBarHeight}>
      <View style={[styles.root, statusBarStyle]}>
        <DetailHeader
          title={FOLLOWING}
          style={styles.header}
          hideMore={true}
          onBackPress={handleBackPress}
        />

        <Search style={styles.search} />

        <NavigationBar style={styles.navigationBar} />
      </View>
    </TabBarHeightContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: 8,
  },
  search: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  navigationBar: {
    marginTop: 30,
    marginHorizontal: 20,
  },
});
