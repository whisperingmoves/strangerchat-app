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
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {
  CreateTime,
  FirstImage,
  Online,
  Relation as RelationType,
  UserId,
  Username,
} from '../store/slice';
import {Avatar} from '../../avatar/store/slice';
import Relation from './Relation';
import Info from './Info';
import {generateFullURL, getUsername} from '../../helper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export type Props = {
  relation?: RelationType;
  firstImage?: FirstImage;
  avatar: Avatar;
  online?: Online;
  userId: UserId;
  username?: Username;
  createTime: CreateTime;
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
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <ImageBackground
        style={styles.root}
        source={{
          uri: props.firstImage
            ? generateFullURL(props.firstImage)
            : generateFullURL(props.avatar),
        }}
        imageStyle={styles.bg}>
        <LinearGradient
          colors={['#FFFFFF00', '#00000090']}
          style={styles.container}>
          {(props.relation || props.relation === 0) && (
            <Relation relation={props.relation} style={styles.relation} />
          )}

          <Info
            style={styles.info}
            avatar={props.avatar}
            username={
              props.username ? props.username : getUsername(props.userId)
            }
            createTime={props.createTime}
          />
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 126,
    height: 176,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  relation: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  info: {
    position: 'absolute',
    bottom: 10,
  },
});
