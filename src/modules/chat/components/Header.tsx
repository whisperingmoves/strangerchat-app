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
import {StyleSheet, Text, View} from 'react-native';
import {CHAT} from '../../../constants/Config';
import PlaceHolder from '../../../components/PlaceHolder';
import Following from './Following';

export default () => {
  return (
    <View style={styles.root}>
      <Text style={styles.chatTxt}>{CHAT}</Text>

      <PlaceHolder />

      <Following />

      {/*<TouchableOpacity activeOpacity={0.7}>*/}
      {/*  <Image source={icon_add_filled} />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  chatTxt: {
    color: '#554C5F',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
