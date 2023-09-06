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

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import HasNewIndicator from '../../../components/HasNewIndicator';
import PlaceHolder from '../../../components/PlaceHolder';
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

            <HasNewIndicator style={styles.indicator} />
          </TouchableOpacity>
        );
      })}

      <PlaceHolder />

      <View style={styles.container}>
        <Image source={icon_coin} style={styles.coinIcon} />

        <Text style={styles.coinTxt}>1573</Text>
      </View>

      <TabBarIndicator
        style={{
          ...styles.tabBarIndicator,
          ...indicatorStyle,
        }}
      />
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
  tabBarIndicator: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
});
