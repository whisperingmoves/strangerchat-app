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

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {
  ColorValue,
  StyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_more from '../assets/images/icons/icon_more.png';
import icon_backtrack from '../assets/images/icons/icon_backtrack.png';

type Props = {
  title: string;
  onBackPress: () => void;
  onMorePress?: () => void;
  style: StyleProp<ViewStyle>;
  hideMore?: boolean;
  foregroundColor?: ColorValue;
};

export default (props: Props) => {
  const txtStyle = useMemo(() => {
    return {
      color: props.foregroundColor ? props.foregroundColor : '#554C5F',
    };
  }, [props.foregroundColor]);

  const iconStyle = useMemo(() => {
    return {
      tintColor: props.foregroundColor ? props.foregroundColor : '#8E8895',
    };
  }, [props.foregroundColor]);

  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onBackPress}
        style={styles.backBtn}>
        <Image source={icon_backtrack} style={[styles.backIcon, iconStyle]} />
      </TouchableOpacity>

      <Text style={[styles.txt, txtStyle]}>{props.title}</Text>

      {!props.hideMore && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.onMorePress}
          style={styles.moreBtn}>
          <Image source={icon_more} style={[styles.moreIcon, iconStyle]} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  backIcon: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
  moreBtn: {
    position: 'absolute',
    right: 20,
  },
  moreIcon: {
    width: 4,
    height: 16,
    resizeMode: 'cover',
  },
  txt: {
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
