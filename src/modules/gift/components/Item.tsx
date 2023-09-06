import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Id, Image as ImageType, Value} from '../store/slice';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {generateFullURL} from '../../helper';

export type Item = {
  id: Id;
  image: ImageType;
  value: Value;
};

type Props = {
  itemList: Item[];
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      {props.itemList.map((item, index) => (
        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.7}
          key={`${item.id}-${index}`}>
          <Image source={{uri: generateFullURL(item.image)}} />

          <View style={styles.container}>
            <Image source={icon_coin} style={styles.coinIcon} />

            <Text style={styles.valueTxt}>{item.value}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  item: {
    gap: 6,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coinIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  valueTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
