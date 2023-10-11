import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';
import Separator from './components/Separator';
import Header from './components/ProfileHeader';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.updateTime}-${index}`;

export default () => {
  return (
    <FlatList
      style={styles.root}
      data={[]}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        <Header location={'Los Angeles'} style={styles.header} />
      }
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    marginBottom: 30,
  },
});
