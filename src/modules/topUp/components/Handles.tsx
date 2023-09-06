import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C7C4CC',
  },
});
