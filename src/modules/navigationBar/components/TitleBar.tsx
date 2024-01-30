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
import {Image, ImageBackground, StyleSheet, Text} from 'react-native';

import icon_daily_bg from '../../../assets/images/icons/icon_daily_bg.png';
import icon_daily_axis from '../../../assets/images/icons/icon_daily_axis.png';
import {DAILY_ATTENDANCE} from '../../../constants/navigationBar/Config';

export default () => {
  return (
    <ImageBackground
      style={styles.root}
      source={icon_daily_bg}
      imageStyle={styles.bgImage}>
      <Image style={styles.axis} source={icon_daily_axis} />

      <Text style={styles.txt}>{DAILY_ATTENDANCE}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  axis: {
    position: 'absolute',
    top: -12,
    width: '74%',
  },
  txt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
