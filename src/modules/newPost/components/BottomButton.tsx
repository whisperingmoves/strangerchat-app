import React, {useCallback, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_picture from '../../../assets/images/icons/icon_picture.png';
import PlaceHolder from '../../../components/PlaceHolder';
import {openImagePicker} from '../../../utils/image';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useAppDispatch} from '../../../hooks';
import {Photo, setScene, uploadPostAsync} from '../store/slice';
import {checkFileExistence} from '../../../utils/file';
import {showError} from '../../../utils/notification';
import {COULD_NOT_FIND_IMAGE} from '../../../constants/Config';
import AtUsersModal, {AtUsersRef} from './AtUsersModal';

type Props = {
  style: StyleProp<ViewStyle>;
  blurInput: () => void;
};

export default (props: Props) => {
  const {showActionSheetWithOptions} = useActionSheet();

  const dispatch = useAppDispatch();

  const atUsersRef = useRef<AtUsersRef>(null);

  const uploadPost = (postImage: Photo) => {
    checkFileExistence(postImage)
      .then(result => {
        if (result) {
          dispatch(setScene('uploadPost'));

          dispatch(uploadPostAsync(postImage));
        } else {
          showError(COULD_NOT_FIND_IMAGE);
        }
      })
      .catch(() => showError(COULD_NOT_FIND_IMAGE));
  };

  const handleImagePicker = () => {
    props.blurInput();

    setTimeout(() => {
      openImagePicker(showActionSheetWithOptions, uploadPost);
    }, 200);
  };

  const handleAtUsersPress = useCallback(() => {
    atUsersRef.current?.show();
  }, []);

  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleImagePicker}>
        <Image source={icon_picture} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={handleAtUsersPress}>
        <Text style={styles.mentionTxt}>@</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity activeOpacity={0.7}>*/}
      {/*  <Image source={icon_emoji} />*/}
      {/*</TouchableOpacity>*/}

      <PlaceHolder />

      {/*<TouchableOpacity activeOpacity={0.7}>*/}
      {/*  <Image source={icon_add_outlined} />*/}
      {/*</TouchableOpacity>*/}

      <AtUsersModal ref={atUsersRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    gap: 26,
    borderColor: '#F1F0F3',
    borderWidth: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  mentionTxt: {
    color: '#554C5F',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
