import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import icon_no_notification_found from '../assets/images/icons/icon_no_notification_found.png';
import {
  NO_NOTIFICATION_FOUND,
  WE_DID_NOT_FOUND_ANY_NOTIFICATION,
} from '../constants/notification/Config';

export default () => {
  return (
    <View style={styles.root}>
      <Image source={icon_no_notification_found} />

      <Text style={styles.titleTxt}>{NO_NOTIFICATION_FOUND}</Text>

      <Text style={styles.descTxt}>{WE_DID_NOT_FOUND_ANY_NOTIFICATION}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 32,
    marginBottom: 16,
  },
  descTxt: {
    color: '#C7C4CC',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
