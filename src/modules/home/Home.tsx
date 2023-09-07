import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Online from './components/Online';
import OnlineTxt from './components/OnlineTxt';
import NewStories from './components/NewStories';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  return (
    <LinearGradient colors={['#D988FF', '#8B5CFF']} style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={statusBarStyle}
        bounces={false}>
        <Online />

        <OnlineTxt style={styles.onlineTxt} />

        <NewStories style={styles.newStories} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  onlineTxt: {
    marginTop: 30,
  },
  newStories: {
    marginTop: 38,
  },
});
