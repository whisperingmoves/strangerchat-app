import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {GOLD_COIN_RECHARGE} from '../../../constants/Config';
import {TransactionData} from '../../../apis/transaction/getCoinTransactions';
import {convertUnixTimestamp} from '../../../utils/date';

export default (props: TransactionData) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} style={styles.coinBtn}>
        <Image source={icon_coin} style={styles.coinIcon} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.titleTxt}>{GOLD_COIN_RECHARGE}</Text>
          <Text style={styles.unitTxt}>{props.currency}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.createdAtTxt}>
            {convertUnixTimestamp(props.createdAt)}
          </Text>
          <Text style={styles.amountTxt}>+{props.amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  coinBtn: {
    backgroundColor: '#FF98381A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  coinIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    gap: 4,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  unitTxt: {
    color: '#554C5F',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  createdAtTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  amountTxt: {
    color: '#554C5F',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
