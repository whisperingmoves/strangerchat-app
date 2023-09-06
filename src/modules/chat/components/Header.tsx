import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CHAT} from '../../../constants/Config';
import PlaceHolder from '../../../components/PlaceHolder';
import Following from './Following';

export default () => {
  return (
    <View style={styles.root}>
      <Text style={styles.chatTxt}>{CHAT}</Text>

      <PlaceHolder />

      <Following />

      {/*<TouchableOpacity activeOpacity={0.7}>*/}
      {/*  <Image source={icon_add_filled} />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  chatTxt: {
    color: '#554C5F',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
