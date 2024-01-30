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
  tag: string;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{props.tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F0F3',
    backgroundColor: '#FFF',
  },
  txt: {
    color: '#8E8895',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
