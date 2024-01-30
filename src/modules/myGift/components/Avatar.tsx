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
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import icon_champion_crown from '../../../assets/images/icons/icon_champion_crown.png';
import icon_second_crown from '../../../assets/images/icons/icon_second_crown.png';
import icon_third_crown from '../../../assets/images/icons/icon_third_crown.png';
import icon_champion_wreath from '../../../assets/images/icons/icon_champion_wreath.png';
import icon_second_wreath from '../../../assets/images/icons/icon_second_wreath.png';
import icon_third_wreath from '../../../assets/images/icons/icon_third_wreath.png';
import {Avatar, CurrentRanking} from '../store/slice';
import {generateFullURL} from '../../helper';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = {
  userId: string;
  avatar: Avatar;
  currentRanking: CurrentRanking;
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
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image source={CROWN_MAP[props.currentRanking]} style={styles.crown} />

      <LinearGradient
        colors={GRADIENT_COLOR[props.currentRanking]}
        style={styles.avatarBtn}>
        <Image
          source={{uri: generateFullURL(props.avatar)}}
          style={styles.avatar}
        />
      </LinearGradient>

      <Image source={WREATH_MAP[props.currentRanking]} style={styles.wreath} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  crown: {
    marginBottom: -2,
  },
  avatarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    resizeMode: 'cover',
  },
  wreath: {
    marginTop: -(72 - 8),
  },
});

type GradientColor = {
  [key: number]: string[];
};

const GRADIENT_COLOR: GradientColor = {
  1: ['#FFCB5B', '#FF9838'],
  2: ['#62DDFF', '#40B2FF'],
  3: ['#FF5FB0', '#FF4288'],
};

type CrownMap = {
  [key: number]: ImageSourcePropType;
};

const CROWN_MAP: CrownMap = {
  1: icon_champion_crown,
  2: icon_second_crown,
  3: icon_third_crown,
};

const WREATH_MAP: CrownMap = {
  1: icon_champion_wreath,
  2: icon_third_wreath,
  3: icon_second_wreath,
};
