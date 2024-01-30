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

type Props = {
  imageIndex: number;
  imagesCount: number;
};

const ImageFooter = ({imageIndex, imagesCount}: Props) => (
  <View style={styles.root}>
    <Text style={styles.text}>{`${imageIndex + 1} / ${imagesCount}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    height: 64,
    backgroundColor: '#00000077',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: '#FFF',
  },
});

export default ImageFooter;
