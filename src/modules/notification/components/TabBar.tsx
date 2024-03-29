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

import React, {useState} from 'react';
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

export default ({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const [tabPositions, setTabPositions] = useState<Array<LayoutRectangle>>([]);

  const handleLayoutChange = (event: LayoutChangeEvent, index: number) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    const tabPosition = {x, y, width, height};
    const newTabPositions = [...tabPositions];
    newTabPositions[index] = tabPosition;
    setTabPositions(newTabPositions);
  };

  const inputRange = state.routes.map((_, i) => i);

  const indicatorStyle: StyleProp<ViewStyle> = {
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
            onLayout={event => handleLayoutChange(event, index)}>
            <Text
              style={[
                styles.txt,
                isFocused ? styles.selectedTxt : styles.unSelectedTxt,
              ]}>
              {label}
            </Text>
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
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0F3',
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginBottom: 16,
  },
  selectedTxt: {
    color: '#8B5CFF',
    fontWeight: 'bold',
  },
  unSelectedTxt: {
    color: '#8E8895',
  },
  tabBarIndicator: {
    position: 'absolute',
    left: 30,
    bottom: 0,
  },
});
