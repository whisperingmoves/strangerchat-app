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

import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import PlaceHolder from '../../../components/PlaceHolder';
import {
  buyCoinProductAsync,
  Coins,
  Currency,
  Price,
  ProductId,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {formatPrice} from '../../../utils/currency';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError, showSuccess} from '../../../utils/notification';
import {PURCHASE_SUCCESSFULLY} from '../../../constants/topUp/Config';

export type Props = {
  productId: ProductId;
  coins: Coins;
  originalPrice?: Price;
  price: Price;
  currency: Currency;
  hideTopUp: () => void;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const handlePress = useCallback(() => {
    dispatch(setScene('buyCoinProduct'));

    dispatch(
      buyCoinProductAsync({
        productId: props.productId,
        request: {receipt: 'fake receipt'},
      }),
    );
  }, [dispatch, props.productId]);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'buyCoinProduct') {
      dispatch(resetStatus());

      showSuccess(PURCHASE_SUCCESSFULLY);

      setTimeout(() => {
        props.hideTopUp();
      }, 200);

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'buyCoinProduct') {
      dispatch(resetStatus());

      const {error} = store.getState().topUp;

      showError(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image source={icon_coin} style={styles.icon} />

      <Text style={styles.coinsTxt}>{props.coins}</Text>

      <PlaceHolder />

      <View style={styles.priceContainer}>
        {props.originalPrice && (
          <Text style={styles.originalPriceTxt}>
            {formatPrice(props.originalPrice, props.currency)}
          </Text>
        )}

        <Text style={styles.priceTxt}>
          {formatPrice(props.price, props.currency)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F0F3',
    gap: 16,
    paddingHorizontal: 16,
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  coinsTxt: {
    color: '#554C5F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  originalPriceTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textDecorationLine: 'line-through',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  priceTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
