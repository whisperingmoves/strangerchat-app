import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Header from './Header';
import Avatar from './Avatar';
import Username from './Username';
import Stats from './Stats';
import Location from './Location';

type Props = {
  avatar: ImageSourcePropType;
  username: string;
  location: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  return (
    <LinearGradient
      style={[styles.root, statusBarStyle, props.style]}
      colors={['#D988FF', '#8B5CFF']}>
      <Header style={styles.header} />

      <Avatar avatar={props.avatar} style={styles.avatar} />

      <Username username={props.username} style={styles.username} />

      <Location location={props.location} style={styles.location} />

      <Stats
        followingCount={43}
        followCount={7389}
        visitedCount={873}
        style={styles.stats}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    marginTop: 6,
  },
  avatar: {
    marginTop: 32,
  },
  username: {
    marginTop: 20,
  },
  location: {
    marginTop: 22,
  },
  stats: {
    marginTop: 44,
    marginBottom: 20,
  },
});
