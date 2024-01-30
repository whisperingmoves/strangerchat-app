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

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {PLACE_HOLDER} from '../../../constants/newPost/Config';
import {
  confirmedAtUsers,
  content,
  images,
  removeAtUser,
  removeConfirmedAtUser,
  removeImageByIndex,
  setState,
  UserId,
} from '../store/slice';
import {useAppSelector} from '../../../hooks';
import PhotoList from '../../../components/photoList/PhotoList';
import {generateFullURL} from '../../helper';
import ConfirmedAtUserList from '../../../components/atUserList/AtUserList';

export interface InputRef {
  blur: () => void;
}

type Props = {
  style: StyleProp<ViewStyle>;
};

export default forwardRef((props: Props, ref) => {
  const inputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();

  const contentValue = useAppSelector(content);

  const imagesValue = useAppSelector(images);

  const blur = () => {
    inputRef.current?.blur();
  };

  useImperativeHandle(ref, () => {
    return {
      blur,
    };
  });

  const handleDelete = (index: number) => {
    dispatch(removeImageByIndex(index));
  };

  const confirmedAtUsersValue = useAppSelector(confirmedAtUsers);

  const handleConfirmedAtUserPress = useCallback(
    (userId: UserId) => {
      dispatch(removeConfirmedAtUser(userId));

      dispatch(removeAtUser(userId));
    },
    [dispatch],
  );

  return (
    <ScrollView
      style={[styles.root, props.style]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <TextInput
        style={styles.input}
        placeholder={PLACE_HOLDER}
        placeholderTextColor={'#C7C4CC'}
        multiline={true}
        ref={inputRef}
        autoFocus={true}
        value={contentValue}
        onChangeText={text => {
          dispatch(setState({content: text}));
        }}
        cursorColor={'#8B5CFF'}
        selectionColor={'#8B5CFF'}
      />

      {imagesValue && (
        <PhotoList
          photoList={imagesValue.map(item => generateFullURL(item))}
          isMarginLeft={false}
          onDelete={handleDelete}
        />
      )}

      {confirmedAtUsersValue.length > 0 && (
        <ConfirmedAtUserList
          atUsers={confirmedAtUsersValue}
          onItemPress={handleConfirmedAtUserPress}
        />
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    gap: 10,
  },
  input: {
    width: '100%',
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
