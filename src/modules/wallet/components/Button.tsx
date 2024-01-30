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

import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type Props = {
  tintColor: string;
  icon: ImageSourcePropType;
  label: string;
  onPress?: () => void;
};

export default (props: Props) => {
  const btnStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: props.tintColor,
    };
  }, [props.tintColor]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.btn, btnStyle]}
        onPress={props.onPress}>
        <Image source={props.icon} />
      </TouchableOpacity>

      <Text style={styles.labelTxt}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 8,
    alignItems: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTxt: {
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
