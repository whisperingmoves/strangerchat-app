import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {Route} from '@react-navigation/native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Header from './components/Header';
import Search from './components/Search';
import FAB from './components/FAB';
import List from './components/List';

type Props = {
  route: Route<string, {tabBarHeight: number}>;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const {tabBarHeight} = props.route.params;

  return (
    <View style={[styles.root, statusBarStyle]}>
      <Header />

      <Search style={styles.search} />

      <List tabBarHeight={tabBarHeight} style={styles.list} />

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
