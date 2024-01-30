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
  Image,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import PlaceHolder from '../../../components/PlaceHolder';
import {coinBalance} from '../../../stores/user/slice';
import {useAppSelector} from '../../../hooks';

export default ({state, descriptors, navigation}: MaterialTopTabBarProps) => {
  const [tabPositions, setTabPositions] = useState<Array<LayoutRectangle>>([]);

  const coinBalanceValue = useAppSelector(coinBalance);

  const handleLayoutChange = (event: LayoutChangeEvent, index: number) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    const tabPosition = {x, y, width, height};
    const newTabPositions = [...tabPositions];
    newTabPositions[index] = tabPosition;
    setTabPositions(newTabPositions);
  };

  // const inputRange = state.routes.map((_, i) => i);

  // const indicatorStyle: StyleProp<ViewStyle> = {
  //   transform: [
  //     {
  //       translateX: position.interpolate({
  //         inputRange: inputRange,
  //         outputRange: inputRange.map(
  //           i =>
  //             (i === 0 ? 0 : tabPositions[i]?.x - tabPositions[0]?.x) +
  //               tabPositions[i]?.width / 2 -
  //               9 || 0,
  //         ),
  //       }),
  //     },
  //   ],
  // };

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
            // @ts-ignore
            navigation.navigate({name: route.name, merge: true});
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

            {/*<HasNewIndicator style={styles.indicator} />*/}
          </TouchableOpacity>
        );
      })}

      <PlaceHolder />

      <View style={styles.container}>
        <Image source={icon_coin} style={styles.coinIcon} />

        <Text style={styles.coinTxt}>{coinBalanceValue}</Text>
      </View>

      {/*<TabBarIndicator*/}
      {/*  style={{*/}
      {/*    ...styles.tabBarIndicator,*/}
      {/*    // ...indicatorStyle,*/}
      {/*  }}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 4,
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginBottom: 8,
  },
  selectedTxt: {
    color: '#8B5CFF',
    fontWeight: 'bold',
  },
  unSelectedTxt: {
    color: '#C7C4CC',
  },
  indicator: {
    position: 'absolute',
    right: -4,
    top: -4,
  },
  container: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  coinIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    resizeMode: 'cover',
  },
  coinTxt: {
    color: '#C7C4CC',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  // tabBarIndicator: {
  //   position: 'absolute',
  //   left: 0,
  //   bottom: 0,
  // },
});
