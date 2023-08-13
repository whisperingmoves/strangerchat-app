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
