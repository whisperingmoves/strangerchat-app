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
import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import icon_system from '../../../assets/images/icons/icon_system.png';
import icon_wallet from '../../../assets/images/icons/icon_wallet.png';
import {NotificationType, ReadStatus} from '../store/slice';
import HasNewIndicator from '../../../components/HasNewIndicator';

type Props = {
  notificationType: NotificationType;
  readStatus?: ReadStatus;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        colors={
          props.notificationType === 1
            ? ['#D988FF', '#8B5CFF']
            : ['#62DDFF', '#40B2FF']
        }
        style={styles.root}>
        <Image
          source={props.notificationType === 1 ? icon_wallet : icon_system}
        />
      </LinearGradient>

      {props.readStatus !== 1 && <HasNewIndicator style={styles.indicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
