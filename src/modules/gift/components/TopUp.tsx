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
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import icon_next from '../../../assets/images/icons/icon_next.png';
import {TOP_UP} from '../../../constants/Config';

type Props = {
  onPress: () => void;
};

export default (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={props.onPress}>
      <Text style={styles.txt}>{TOP_UP}</Text>

      <Image source={icon_next} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  txt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  icon: {
    width: 6,
    height: 12,
    tintColor: '#8B5CFF',
    resizeMode: 'cover',
  },
});
