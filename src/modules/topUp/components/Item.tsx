import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import PlaceHolder from '../../../components/PlaceHolder';
import {Coins, Price, ProductId} from '../store/slice';

export type Props = {
  productId: ProductId;
  coins: Coins;
  originalPrice?: Price;
  price: Price;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Image source={icon_coin} style={styles.icon} />

      <Text style={styles.coinsTxt}>{props.coins}</Text>

      <PlaceHolder />

      <View style={styles.priceContainer}>
        {props.originalPrice && (
          <Text style={styles.originalPriceTxt}>{props.originalPrice}</Text>
        )}

        <Text style={styles.priceTxt}>{props.price}</Text>
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
