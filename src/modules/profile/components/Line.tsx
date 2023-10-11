import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 0,
    height: 17,
    borderWidth: StyleSheet.hairlineWidth * 2,
    opacity: 0.3,
    borderColor: '#FFF',
  },
});
