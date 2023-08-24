import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import icon_backtrack from '../../../assets/images/icons/icon_backtrack.png';
import SearchInput from './SearchInput';

type Props = {
  onPress: () => void;
};

export default ({onPress}: Props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image style={styles.img} source={icon_backtrack} />
      </TouchableOpacity>

      <SearchInput />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  img: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
});
