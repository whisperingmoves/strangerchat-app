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

import React, {RefObject} from 'react';
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
  inputRef: RefObject<TextInput>;
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
        ref={props.inputRef}
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
