import React from 'react';
import {Image, StyleSheet} from 'react-native';

import icon_checked from '../../../assets/images/icons/icon_checked.png';

export default () => {
  return <Image style={styles.root} source={icon_checked} />;
};

const styles = StyleSheet.create({
  root: {
    width: 26,
    height: 26,
    borderRadius: 13,
    resizeMode: 'cover',
  },
});
