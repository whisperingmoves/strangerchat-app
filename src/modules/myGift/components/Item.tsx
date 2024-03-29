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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {Top3Item as ItemProps} from './Top3Item';

import icon_fall from '../../../assets/images/icons/icon_fall.png';
import icon_rise from '../../../assets/images/icons/icon_rise.png';
import {generateFullURL, getUsername} from '../../helper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = ItemProps & {style: StyleProp<ViewStyle>};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handleAvatarPress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.userId,
    });
  }, [navigation, props.userId, tabBarHeight]);

  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.ranking}>
        <Text style={styles.numberTxt}>{props.currentRanking}</Text>

        <Image source={props.diff > 0 ? icon_rise : icon_fall} />
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.avatarBtn}
        onPress={handleAvatarPress}>
        <Image
          source={{uri: generateFullURL(props.avatar)}}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.numberTxt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        <Text style={styles.numberTxt}>{props.count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 70,
    paddingHorizontal: 20,
    backgroundColor: '#8B5CFF29',
  },
  ranking: {
    gap: 6,
    marginRight: 16,
  },
  numberTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  avatarBtn: {
    marginRight: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
