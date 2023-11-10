import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListEmpty from '../../components/ListEmpty';
import ListFooter from '../../components/ListFooter';

const renderItem = () => <View />;

const keyExtractor = (item: any, index: number) => `${index}`;

export default () => {
  return (
    <FlatList
      style={styles.root}
      data={mockData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={<ListFooter tabBarHeight={60} />}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    marginTop: 50,
  },
});

const mockData: any[] = [];
