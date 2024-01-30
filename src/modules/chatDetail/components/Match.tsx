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
import {StyleSheet, Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {MATCH} from '../../../constants/chatDetail/Config';

export default (props: Props) => {
  return (
    <LinearGradient
      style={styles.root}
      colors={['#FF5FB0', '#FF4288']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text style={styles.txt}>{MATCH}</Text>

      <Text style={styles.txt}>{props.percentage}</Text>
    </LinearGradient>
  );
};

type Props = {
  percentage: string;
};

const styles = StyleSheet.create({
  root: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  txt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
