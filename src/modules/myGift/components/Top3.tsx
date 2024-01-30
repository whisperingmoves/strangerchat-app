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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item, {Top3Item as ItemProps} from './Top3Item';
import {swapFirstTwoItems} from '../helper';

type Props = {
  itemList: ItemProps[];
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const list = useMemo(() => {
    return swapFirstTwoItems(props.itemList);
  }, [props.itemList]);

  const singleStyle: StyleProp<ViewStyle> = useMemo(() => {
    return list.length === 1 ? {justifyContent: 'center'} : {};
  }, [list]);

  return (
    <View style={[styles.root, props.style, singleStyle]}>
      {list.map((value, index) => (
        <Item
          key={index}
          {...value}
          style={
            (index === 0 || index === 2) && list.length > 1
              ? styles.notChampion
              : {}
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notChampion: {
    marginTop: 16,
  },
});
