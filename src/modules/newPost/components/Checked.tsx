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
import {Image, StyleSheet} from 'react-native';

import icon_checked from '../../../assets/images/icons/icon_checked.png';

export default () => {
  return <Image style={styles.root} source={icon_checked} />;
};

const styles = StyleSheet.create({
  root: {
    width: 26,
    height: 26,
    borderRadius: 13,
    resizeMode: 'cover',
  },
});
