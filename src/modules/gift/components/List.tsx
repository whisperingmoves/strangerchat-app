import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Item, {Item as ItemProps} from './Item';
import Separator from './Separator';
import {useAppSelector} from '../../../hooks';
import {list} from '../store/slice';
import {transformItemArray} from '../helper';

const renderItem = ({item}: {item: ItemProps[]}) => <Item itemList={item} />;

const keyExtractor = (item: ItemProps[], index: number) =>
  `${item[0].id}-${item[1].id}-${index}`;

export default () => {
  const listValue = useAppSelector(list);

  const data = transformItemArray(listValue);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      style={styles.root}
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={keyExtractor}
      horizontal={true}
      ItemSeparatorComponent={Separator}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingVertical: 30,
    paddingHorizontal: 18,
  },
});
