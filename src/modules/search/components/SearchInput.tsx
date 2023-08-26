import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_search from '../../../assets/images/icons/icon_search.png';
import {SEARCH} from '../../../constants/search/Config';
import {useAppDispatch} from '../../../hooks';
import {
  getLatestPostsAsync,
  Keyword,
  resetPage,
  setKeyword,
  setScene,
} from '../store/slice';

type Props = {
  keyword?: Keyword;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const handleChangeText = (text: string) => {
    dispatch(setKeyword(text));

    if (!text) {
      return;
    }

    dispatch(setScene('getLatestPosts'));

    dispatch(resetPage());

    dispatch(getLatestPostsAsync());
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder={SEARCH}
        placeholderTextColor={'#8E8895'}
        value={props.keyword}
        onChangeText={handleChangeText}
      />

      <TouchableOpacity activeOpacity={0.7} disabled={true}>
        <Image source={icon_search} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 16,
    borderRadius: 18,
    backgroundColor: '#F1F0F3',
  },
  input: {
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
  },
});
