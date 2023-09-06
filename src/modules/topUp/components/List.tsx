import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item from './Item';
import Footer from './Footer';
import {useAppSelector} from '../../../hooks';
import {list} from '../store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const listValue = useAppSelector(list);

  const itemList = listValue.map((item, index) => {
    return (
      <Item
        key={`${item.productId}-${index}`}
        productId={item.productId}
        originalPrice={item.originalPrice}
        price={item.price}
        coins={item.coins}
      />
    );
  });

  return (
    <ScrollView
      style={[styles.root, props.style]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      {itemList}

      <Footer style={styles.footer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    gap: 20,
  },
  footer: {
    marginTop: 12,
  },
});
