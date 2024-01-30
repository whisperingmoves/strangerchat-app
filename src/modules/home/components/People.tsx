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

import React, {useCallback, useContext} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_bubble from '../../../assets/images/icons/icon_bubble.png';
import {Distance, UserId, Username} from '../store/slice';
import {Avatar} from '../../avatar/store/slice';
import {AWAY_FROM} from '../../../constants/home/Config';
import {generateFullURL, getUsername} from '../../helper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = {
  style: StyleProp<ViewStyle>;
  userId: UserId;
  username?: Username;
  distance?: Distance;
  avatar: Avatar;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.userId,
    });
  }, [navigation, props.userId, tabBarHeight]);

  return (
    <View style={[styles.root, props.style]}>
      <View>
        <Text style={styles.txt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        {(props.distance || props.distance === 0) && (
          <Text style={styles.txt}>{AWAY_FROM(`${props.distance} km`)}</Text>
        )}
      </View>

      <ImageBackground
        source={icon_bubble}
        style={styles.avatarBg}
        imageStyle={styles.avatarBgImg}>
        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <Image
            source={{uri: generateFullURL(props.avatar)}}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 38,
    width: 122,
    borderRadius: 19,
    backgroundColor: '#00000033',
    paddingLeft: 12,
    paddingRight: 22,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    color: '#FFFFFF',
    fontSize: 12,
  },
  avatarBg: {
    width: 38,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -18,
  },
  avatarBgImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: 'cover',
    marginTop: -3,
  },
});
