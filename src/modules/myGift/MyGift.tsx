import React, {useCallback, useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import LinearGradient from 'react-native-linear-gradient';

import {Route, useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Header from './components/Header';

import Switch from './components/Switch';

import Top3 from './components/Top3';
import Item from './components/Item';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getReceivedGiftsAsync, list, resetStatus, status} from './store/slice';
import {showError} from '../../utils/notification';
import {store} from '../../stores/store';
import {splitListValue} from './helper';
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

  const navigation = useNavigation<StackNavigationProp<any>>();

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const statusValue = useAppSelector(status);

  const listValue = useAppSelector(list);

  const [TOP3_LIST, LEFT_LIST] = splitListValue(listValue);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusValue === 'success') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed') {
      showError(store.getState().myGift.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  useEffect(() => {
    dispatch(getReceivedGiftsAsync());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TabBarHeightContext.Provider value={tabBarHeight}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
        <LinearGradient
          colors={['#D988FF', '#8B5CFF']}
          style={[styles.background, statusBarStyle]}>
          <Header style={styles.header} onPress={handlePress} />

          <Switch style={styles.switch} />

          <Top3 style={styles.top3} itemList={TOP3_LIST} />
        </LinearGradient>

        <View style={styles.leftContainer}>
          {LEFT_LIST.map((value, index) => (
            <Item key={index} {...value} style={styles.left} />
          ))}
        </View>
      </ScrollView>
    </TabBarHeightContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  background: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    marginTop: 12,
  },
  switch: {
    marginTop: 24,
  },
  top3: {
    marginBottom: 32 + 20,
    marginTop: 32,
  },
  leftContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  left: {
    marginBottom: 20,
  },
});
