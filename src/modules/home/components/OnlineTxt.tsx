import {StyleSheet, Text} from 'react-native';

import React from 'react';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {CURRENTLY_ONLINE} from '../../../constants/home/Config';
import {useAppSelector} from '../../../hooks';
import {formatNumber} from '../../../utils/number';
import {Online, onlineUsers} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const currentlyOnlineValue: Online = useAppSelector(onlineUsers);

  return (
    <Text style={[styles.root, props.style]}>
      {CURRENTLY_ONLINE}
      <Text style={styles.countTxt}>{formatNumber(currentlyOnlineValue)}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  countTxt: {
    color: '#62DDFF',
  },
});
