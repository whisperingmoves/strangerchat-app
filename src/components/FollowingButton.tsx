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
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FOLLOWING} from '../constants/Config';

type Props = {
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={props.onPress}>
      <Text style={styles.txt}>{FOLLOWING}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#8E8895',
    fontSize: 10,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
