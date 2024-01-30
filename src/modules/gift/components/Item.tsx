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
