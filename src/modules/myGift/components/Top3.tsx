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
