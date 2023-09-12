import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Id,
  Image as ImageType,
  Name,
  selectedGift,
  setSelectedGift,
  Value,
} from '../store/slice';

import icon_coin from '../../../assets/images/icons/icon_coin.png';
import {generateFullURL} from '../../helper';
import {useAppDispatch, useAppSelector} from '../../../hooks';

export type Item = {
  id: Id;
  name: Name;
  image: ImageType;
  value: Value;
};

type Props = {
  itemList: Item[];
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const gift = useAppSelector(selectedGift);

  const selectedIdValue = gift?.id;

  return (
    <View style={styles.root}>
      {props.itemList.map((item, index) => {
        const selected = selectedIdValue === item.id;

        const handlePress = () => {
          dispatch(setSelectedGift(item));
        };

        return (
          <TouchableOpacity
            style={[styles.item, selected ? styles.selectedItem : null]}
            activeOpacity={0.7}
            key={`${item.id}-${index}`}
            onPress={handlePress}>
            <Image
              source={{uri: generateFullURL(item.image), width: 47, height: 47}}
            />

            <View style={styles.container}>
              <Image source={icon_coin} style={styles.coinIcon} />

              <Text
                style={[
                  styles.valueTxt,
                  selected ? styles.selectedValueTxt : null,
                ]}>
                {item.value}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
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
    borderRadius: 6,
    padding: 6,
  },
  selectedItem: {
    backgroundColor: '#00000030',
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
  selectedValueTxt: {
    color: '#FFF',
  },
});
