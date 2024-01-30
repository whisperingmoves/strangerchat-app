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
import {Image, StyleSheet, TextInput, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_search from '../assets/images/icons/icon_search.png';
import {SEARCH} from '../constants/search/Config';

type Props = {
  style: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  text?: string;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Image source={icon_search} />

      <TextInput
        style={styles.txt}
        placeholder={SEARCH}
        placeholderTextColor={'#8E8895'}
        returnKeyType={'search'}
        onChangeText={props.onChangeText}
        value={props.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    // width: '100%',
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#F1F0F3',
  },
  txt: {
    fontSize: 14,
    color: '#554C5F',
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
  },
});
