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
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';

import icon_vector from '../../../assets/images/icons/icon_vector.png';
import Radar from './Radar';
import NearBy from './NearBy';

export default () => {
  const {width: windowWidth} = useWindowDimensions();

  const insetStyle = {
    width: windowWidth,
    height: windowWidth,
  };

  return (
    <ImageBackground
      style={[insetStyle, styles.root]}
      source={icon_vector}
      imageStyle={styles.bgImage}>
      <Radar />

      <NearBy style={styles.nearBy} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  nearBy: {
    position: 'absolute',
    top: 0,
  },
});
