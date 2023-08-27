import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, StyleSheet, TextInput} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {PLACE_HOLDER} from '../../../constants/newPost/Config';
import {content, images, removeImageByIndex, setState} from '../store/slice';
import {useAppSelector} from '../../../hooks';
import PhotoList from '../../../components/photoList/PhotoList';
import {generateFullURL} from '../../helper';

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
