import React from 'react';
import {Image, ImageBackground, StyleSheet, Text} from 'react-native';

import icon_daily_bg from '../../../assets/images/icons/icon_daily_bg.png';
import icon_daily_axis from '../../../assets/images/icons/icon_daily_axis.png';
import {DAILY_ATTENDANCE} from '../../../constants/navigationBar/Config';

export default () => {
  return (
    <ImageBackground
      style={styles.root}
      source={icon_daily_bg}
      imageStyle={styles.bgImage}>
      <Image style={styles.axis} source={icon_daily_axis} />

      <Text style={styles.txt}>{DAILY_ATTENDANCE}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  axis: {
    position: 'absolute',
    top: -12,
    width: '74%',
  },
  txt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
