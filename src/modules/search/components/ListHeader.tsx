import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import icon_hot from '../../../assets/images/icons/icon_hot.png';
import {HOT} from '../../../constants/search/Config';

export default () => {
  return (
    <View style={styles.root}>
      <Text style={styles.txt}>{HOT}</Text>

      <Image source={icon_hot} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 21,
  },
  txt: {
    color: '#8E8895',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
