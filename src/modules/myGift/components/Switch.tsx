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
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ALL_TIME, MONTH, WEEK} from '../../../constants/myGift/Config';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {getReceivedGiftsAsync, Range, range, setRange} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const rangeValue = useAppSelector(range);

  const dispatch = useAppDispatch();

  return (
    <View style={[styles.root, props.style]}>
      {BUTTON_LIST.map((value, index) => {
        const handlePress = () => {
          LayoutAnimation.easeInEaseOut();

          dispatch(setRange(index as Range));

          dispatch(getReceivedGiftsAsync());
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            style={[styles.btn, rangeValue === index ? styles.selectedBtn : {}]}
            onPress={handlePress}>
            <Text
              style={[
                styles.txt,
                rangeValue === index ? styles.selectedTxt : {},
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000001A',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  btn: {
    paddingHorizontal: 14,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBtn: {
    backgroundColor: '#FFF',
  },
  txt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  selectedTxt: {
    color: '#8B5CFF',
  },
});

const BUTTON_LIST: string[] = [ALL_TIME, WEEK, MONTH];
