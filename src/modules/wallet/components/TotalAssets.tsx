// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {TOTAL_ASSETS} from '../../../constants/wallet/Config';
import {formatNumber} from '../../../utils/number';
import {CoinBalance, coinBalance} from '../../../stores/user/slice';
import {useAppSelector} from '../../../hooks';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const coinBalanceValue = useAppSelector(coinBalance);

  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.container}>
        <Text style={styles.titleTxt}>{TOTAL_ASSETS}</Text>
        <Image source={icon_coin} style={styles.icon} />
      </View>

      <Text style={styles.countTxt}>
        {formatNumber(coinBalanceValue as CoinBalance)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 14,
    paddingHorizontal: 34,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleTxt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  icon: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
  countTxt: {
    marginLeft: -4,
    color: '#FFF',
    fontSize: 34,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
