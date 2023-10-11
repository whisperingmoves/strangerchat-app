import React, {useCallback, useEffect} from 'react';
import {Image, ImageStyle, StyleSheet, TouchableOpacity} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {checkFileExistence} from '../../../utils/file';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError} from '../../../utils/notification';
import {COULD_NOT_FIND_IMAGE} from '../../../constants/Config';
import {
  avatar,
  Avatar,
  resetStatus,
  scene,
  setScene,
  setUser,
  status,
  updateUserProfileAsync,
  uploadAvatarAsync,
} from '../../../stores/user/slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {openImagePicker} from '../../../utils/image';
import {store} from '../../../stores/store';
import {generateFullURL} from '../../helper';

type Props = {
  style: StyleProp<ImageStyle>;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const {showActionSheetWithOptions} = useActionSheet();

  const avatarValue = useAppSelector(avatar);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'avatar') {
      dispatch(resetStatus());

      dispatch(setScene('updateAvatar'));

      dispatch(updateUserProfileAsync({avatar: store.getState().user.url}));

      return;
    }

    if (statusValue === 'success' && sceneValue === 'updateAvatar') {
      dispatch(resetStatus());

      dispatch(setUser({avatar: store.getState().user.url}));

      return;
    }

    if (
      statusValue === 'failed' &&
      (sceneValue === 'avatar' || sceneValue === 'updateAvatar')
    ) {
      dispatch(resetStatus());

      const {error} = store.getState().user;

      showError(error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const uploadAvatar = useCallback(
    (uri: Avatar) => {
      checkFileExistence(uri)
        .then(result => {
          if (result) {
            dispatch(setScene('avatar'));

            dispatch(uploadAvatarAsync(uri));
          } else {
            showError(COULD_NOT_FIND_IMAGE);
          }
        })
        .catch(() => showError(COULD_NOT_FIND_IMAGE));
    },
    [dispatch],
  );

  const handlePress = useCallback(() => {
    openImagePicker(showActionSheetWithOptions, uploadAvatar);
  }, [showActionSheetWithOptions, uploadAvatar]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Image
        style={[styles.root, props.style]}
        source={{uri: generateFullURL(avatarValue)}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 86,
    height: 86,
    borderRadius: 43,
    resizeMode: 'cover',
  },
});
