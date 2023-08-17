import React, {useState} from 'react';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {
  Alert,
  Image,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_search from '../../../assets/images/icons/icon_search.png';
import TabBarIndicator from '../../../components/TabBarIndicator';
import PlaceHolder from '../../../components/PlaceHolder';

export default ({
  state,
  navigation,
  position,
  descriptors,
}: MaterialTopTabBarProps) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

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

  const handleSearchPress = () => {
    Alert.alert(
      "navigation.navigate({name: 'Search', params: {}, merge: true});",
    );
  };

  return (
    <View style={[styles.root, statusBarStyle]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label = options.title;

        const isFocused = state.index === index;

        const handleTabPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, params: {}, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.7}
            onPress={handleTabPress}
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

      <PlaceHolder />

      <TouchableOpacity activeOpacity={0.7} onPress={handleSearchPress}>
        <Image source={icon_search} style={styles.searchIcon} />
      </TouchableOpacity>

      <TabBarIndicator style={{...styles.tabBarIndicator, ...indicatorStyle}} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    width: 16,
    height: 16,
    resizeMode: 'cover',
  },
  txt: {
    color: '#554C5F',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginBottom: 10,
  },
  selectedTxt: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  unSelectedTxt: {
    fontSize: 16,
  },
  tabBarIndicator: {
    position: 'absolute',
    left: 20,
    bottom: 0,
  },
});
