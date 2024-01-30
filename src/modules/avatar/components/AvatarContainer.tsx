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
import {PixelRatio, StyleSheet, useWindowDimensions, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import AvatarItem from './AvatarItem';
import {Avatar} from '../store/slice';
import {Gender} from '../../gender/store/slice';
import {AVATAR_BOY_LIST, AVATAR_GIRL_LIST} from '../../helper';

type Props = {
  style: StyleProp<ViewStyle>;
  handleImagePicker: () => void;
  avatarUri: Avatar;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  gender: Gender;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const avatarSize = PixelRatio.roundToNearestPixel(
    (windowWidth - 30 * 2 - 20 * 2) / 3,
  );

  const AVATAR_LIST =
    props.gender === 'male' ? AVATAR_BOY_LIST : AVATAR_GIRL_LIST;

  return (
    <View style={[styles.root, props.style]}>
      {AVATAR_LIST.map((value, index) => (
        <AvatarItem
          key={index}
          avatar={value}
          index={index}
          selected={index === props.selectedIndex}
          onSelected={props.setSelectedIndex}
          size={avatarSize}
          avatarUri={props.avatarUri}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 20,
  },
});
