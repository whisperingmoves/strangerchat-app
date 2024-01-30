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

import React, {useCallback, useMemo, useState} from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import TabBarIndicator from '../../../components/TabBarIndicator';
import {useAppSelector} from '../../../hooks';
import {followersCount, followingCount} from '../../../stores/user/slice';
import {list as closeFriendList, total} from '../../closeFriend/store/slice';

export default ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const followingCountValue = useAppSelector(followingCount);

  const followersCountValue = useAppSelector(followersCount);

  const closeFriendCountValue = useAppSelector(total);

  const closeFriendListValue = useAppSelector(closeFriendList);

  const countList = useMemo(
    () => [
      followingCountValue || 0,
      followersCountValue || 0,
      closeFriendCountValue || closeFriendListValue.length,
    ],
    [
      closeFriendCountValue,
      closeFriendListValue.length,
      followersCountValue,
      followingCountValue,
    ],
  );

  const [tabPositions, setTabPositions] = useState<Array<LayoutRectangle>>([]);

  const handleLayoutChange = useCallback(
    (event: LayoutChangeEvent, index: number) => {
      const {x, y, width, height} = event.nativeEvent.layout;

      const tabPosition = {x, y, width, height};

      const newTabPositions = [...tabPositions];

      newTabPositions[index] = tabPosition;

      setTabPositions(newTabPositions);
    },
    [tabPositions],
  );

  const inputRange = useMemo(
    () => state.routes.map((_, i) => i),
    [state.routes],
  );

  const indicatorStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      transform: [
        {
          translateX: position.interpolate({
            inputRange: inputRange,
            outputRange: inputRange.map(
              i =>
                (i === 0 ? 0 : tabPositions[i]?.x - tabPositions[0]?.x) +
                  tabPositions[i]?.width / 2 -
                  9 || 0,
            ),
          }),
        },
      ],
    };
  }, [inputRange, position, tabPositions]);

  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label = options.title;

        const isFocused = state.index === index;

        const handlePress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.7}
            onPress={handlePress}
            style={styles.item}
            onLayout={event => handleLayoutChange(event, index)}>
            <Text style={styles.countTxt}>{countList[index]}</Text>

            <Text style={styles.labelTxt}>{label}</Text>
          </TouchableOpacity>
        );
      })}

      <TabBarIndicator style={{...styles.tabBarIndicator, ...indicatorStyle}} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  countTxt: {
    color: '#554C5F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  labelTxt: {
    color: '#554C5F60',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  tabBarIndicator: {
    position: 'absolute',
    left: 10,
    bottom: 0,
  },
});
