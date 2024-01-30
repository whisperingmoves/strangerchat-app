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

import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

import DialogBox from './DialogBox';

import icon_close_outlined from '../../../assets/images/icons/icon_close_outlined.png';

export interface DailyAttendanceRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType={'fade'}>
      <View style={styles.root}>
        <DialogBox />

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.closeBtn}
          onPress={hide}>
          <Image source={icon_close_outlined} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000B2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  closeBtn: {
    marginTop: 28,
  },
});
