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

import React, {useCallback, useContext, useMemo} from 'react';
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
import {city as profileCity} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const userCityValue = useAppSelector(city);

  const profileCityValue = useAppSelector(profileCity);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const profileUserIdValue = useContext(UserIdContext);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const cityValue = useMemo(
    () => (profileUserIdValue ? profileCityValue : userCityValue),
    [profileCityValue, profileUserIdValue, userCityValue],
  );

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
