import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#F1F0F3',
    backgroundColor: 'transparent',
  },
});
