import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#8B5CFF',
  },
});
