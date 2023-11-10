import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';
import Separator from './components/Separator';
import ListFooter from '../../components/ListFooter';
import ListEmpty from '../../components/ListEmpty';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) => `${index}`;

export default () => {
  return (
    <FlatList
      style={styles.root}
      data={[]}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={<ListFooter tabBarHeight={16 + 30} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    marginTop: 26,
    paddingHorizontal: 20,
  },
});
