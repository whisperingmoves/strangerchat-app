import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Header from './Header';
import Avatar from './Avatar';
import Username from './Username';
import Stats from './Stats';
import Location from '../../../components/Location';
import {useAppSelector} from '../../../hooks';
import {city} from '../../../stores/user/slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {UserIdContext} from '../context/UserIdContext';
import BackHeader from '../../../components/BackHeader';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const cityValue = useAppSelector(city);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const profileUserIdValue = useContext(UserIdContext);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <LinearGradient
      style={[styles.root, statusBarStyle, props.style]}
      colors={['#D988FF', '#8B5CFF']}>
      {profileUserIdValue ? (
        <BackHeader
          onPress={handleBackPress}
          style={styles.backHeader}
          iconStyle={styles.backIcon}
        />
      ) : (
        <Header style={styles.header} />
      )}

      <Avatar style={styles.avatar} />

      <Username style={styles.username} />

      {cityValue && <Location location={cityValue} style={styles.location} />}

      <Stats style={styles.stats} />
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
  backHeader: {
    marginLeft: '-100%',
  },
  backIcon: {
    tintColor: '#707070',
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
