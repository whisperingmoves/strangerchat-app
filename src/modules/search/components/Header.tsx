import React, {RefObject} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_backtrack from '../../../assets/images/icons/icon_backtrack.png';
import SearchInput from './SearchInput';
import {Keyword} from '../store/slice';

type Props = {
  onPress: () => void;
  keyword?: Keyword;
  inputRef: RefObject<TextInput>;
};

export default ({onPress, keyword, inputRef}: Props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image style={styles.img} source={icon_backtrack} />
      </TouchableOpacity>

      <SearchInput keyword={keyword} inputRef={inputRef} />
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
