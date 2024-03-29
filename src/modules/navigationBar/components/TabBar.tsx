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

import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import icon_home_outlined from '../../../assets/images/icons/icon_home_outlined.png';
import icon_explore_outlined from '../../../assets/images/icons/icon_explore_outlined.png';
import icon_post from '../../../assets/images/icons/icon_post.png';
import icon_chat_outlined from '../../../assets/images/icons/icon_chat_outlined.png';
import icon_profile_outlined from '../../../assets/images/icons/icon_profile_outlined.png';
import icon_home_filled from '../../../assets/images/icons/icon_home_filled.png';
import icon_explore_filled from '../../../assets/images/icons/icon_explore_filled.png';
import icon_chat_filled from '../../../assets/images/icons/icon_chat_filled.png';
import icon_profile_filled from '../../../assets/images/icons/icon_profile_filled.png';
import {useAppSelector} from '../../../hooks';
import {conversationList} from '../../chat/store/slice';
import Badge from '../../../components/Badge';
import {convertNumberToString} from '../../../utils/number';
import {calculateTotalUnreadCount} from '../helper';
import {TabBarHeight} from '../../../contexts/TabBarHeightContext';

type Props = BottomTabBarProps & {
  tabBarHeight: TabBarHeight;
  setTabBarHeight: (tabBarHeight: TabBarHeight) => void;
};

export default ({
  state,
  descriptors,
  navigation,
  tabBarHeight,
  setTabBarHeight,
}: Props) => {
  const conversationListValue = useAppSelector(conversationList);

  const unreadCount = calculateTotalUnreadCount(conversationListValue);

  const {routes, index} = state;

  const outlinedIconList: ImageSourcePropType[] = [
    icon_home_outlined,
    icon_explore_outlined,
    icon_post,
    icon_chat_outlined,
    icon_profile_outlined,
  ];

  const filledIconList: ImageSourcePropType[] = [
    icon_home_filled,
    icon_explore_filled,
    icon_post,
    icon_chat_filled,
    icon_profile_filled,
  ];

  const handleLayout = (event: LayoutChangeEvent) => {
    setTabBarHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.root} onLayout={handleLayout}>
      {routes.map((route: any, i: number) => {
        const {options} = descriptors[route.key];
        const label = options.title;
        const isFocused = index === i;

        const handlePress = () => {
          if (i === 2) {
            navigation.navigate('NewPost');
          } else {
            navigation.navigate(route.name, {tabBarHeight});
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={label}
            style={styles.item}
            onPress={handlePress}>
            <View>
              <Image
                source={isFocused ? filledIconList[i] : outlinedIconList[i]}
              />

              {i === 3 && unreadCount > 0 && (
                <Badge
                  style={styles.badge}
                  text={convertNumberToString(unreadCount)}
                />
              )}
            </View>

            {i !== 2 && (
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.focusedLabel : styles.noFocusedLabel,
                ]}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingBottom: 20,
    borderTopColor: '#F1F0F3',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 10,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  noFocusedLabel: {
    color: '#696173',
  },
  focusedLabel: {
    color: '#8B5CFF',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    transform: [
      {
        scale: 1.2,
      },
    ],
  },
});
