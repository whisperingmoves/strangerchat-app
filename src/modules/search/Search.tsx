import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import HotList from './components/HotList';
import Header from './components/Header';
import SearchList from './components/SearchList';
import {useAppSelector} from '../../hooks';
import {keyword} from './store/slice';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const insets = useSafeAreaInsets();

  const keywordValue = useAppSelector(keyword);

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.root, statusBarStyle]}>
      <Header onPress={handlePress} keyword={keywordValue} />

      {keywordValue ? <SearchList /> : <HotList style={styles.hotList} />}
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
