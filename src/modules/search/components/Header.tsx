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
