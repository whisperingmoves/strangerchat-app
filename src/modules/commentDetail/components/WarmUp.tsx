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

import FreeTimes from './FreeTimes';
import Gift from './Gift';
import {Gender} from '../../gender/store/slice';
import {WARM_UP} from '../../../constants/commentDetail/Config';
import {AuthorId, PostId} from '../store/slice';

type Props = {
  gender: Gender;
  postId: PostId;
  authorId: AuthorId;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{WARM_UP(props.gender)}</Text>

      <FreeTimes postId={props.postId} />

      <Gift authorId={props.authorId} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  txt: {
    color: '#C7C4CC',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
    height: 'auto',
  },
});
