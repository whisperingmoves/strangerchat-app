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
import {Image, StyleSheet, View} from 'react-native';

import Tag from './Tag';
import Match from './Match';
import Details from './Details';
import {OpponentAvatar, OpponentUserId} from '../../chat/store/slice';
import {Avatar} from '../../../stores/user/slice';
import {generateFullURL} from '../../helper';

type Props = {
  tag: string;
  percentage: string;
  userAvatar: Avatar;
  opponentAvatar: OpponentAvatar;
  opponentUserId: OpponentUserId;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Image
        style={[styles.avatar, styles.opponentAvatar]}
        source={{uri: generateFullURL(props.opponentAvatar)}}
      />

      <Image
        style={[styles.avatar, styles.userAvatar]}
        source={{uri: generateFullURL(props.userAvatar)}}
      />

      <View style={styles.tagContainer}>
        <Tag tag={props.tag} />

        <Match percentage={props.percentage} />
      </View>

      <Details style={styles.details} opponentUserId={props.opponentUserId} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 106,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F0F3',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  opponentAvatar: {
    position: 'absolute',
    left: 20,
  },
  userAvatar: {
    position: 'absolute',
    left: 20 + 50 + 6,
  },
  tagContainer: {
    gap: 10,
    alignItems: 'center',
  },
  details: {
    position: 'absolute',
    right: 0,
  },
});
