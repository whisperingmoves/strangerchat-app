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
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from '../../avatar/store/slice';
import {Online} from '../store/slice';
import OnlineIndicator from '../../../components/OnlineIndicator';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: Avatar;
  online?: Online;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{uri: generateFullURL(props.avatar)}}
        style={styles.avatar}
      />

      {props.online === 1 && <OnlineIndicator style={styles.onlineIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#AFE6F5',
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
