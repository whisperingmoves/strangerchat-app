import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  const styles = StyleSheet.create({
    root: {
      width: 10,
      height: 10,
    },
  });
  return <View style={styles.root} />;
};
