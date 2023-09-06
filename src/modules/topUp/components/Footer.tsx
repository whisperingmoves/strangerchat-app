import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {BALANCE} from '../../../constants/chatDetail/Config';
import {useAppSelector} from '../../../hooks';
import {coinBalance} from '../../../stores/user/slice';

type Props = {
  style: ViewStyle;
};

export default (props: Props) => {
  const coinBalanceValue = useAppSelector(coinBalance);

  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.balanceTxt}>{BALANCE}</Text>

      <TouchableOpacity activeOpacity={0.7} style={styles.container}>
        <Image source={icon_coin} style={styles.icon} />

        <Text style={styles.coinTxt}>{coinBalanceValue}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  balanceTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  coinTxt: {
    color: '#554C5F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
