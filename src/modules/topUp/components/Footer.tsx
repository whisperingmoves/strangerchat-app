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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {useAppSelector} from '../../../hooks';
import {coinBalance} from '../../../stores/user/slice';
import {BALANCE} from '../../../constants/topUp/Config';

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
