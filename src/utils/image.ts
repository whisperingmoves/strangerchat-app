import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RESULTS} from 'react-native-permissions';
import {ActionSheetOptions} from '@expo/react-native-action-sheet/lib/typescript/types';

import {
  ALLOW_ACCESS_CAMERA,
  ALLOW_ACCESS_STORAGE,
  CANCEL,
  SELECT_PHOTO,
  TAKE_PHOTO,
} from '../constants/Config';
import {
  checkCameraPermission,
  checkPhotoPermission,
  checkSavePhotoPermission,
  openSettings,
} from './permission';

export const takePhoto = async () => {
  let result = await checkCameraPermission();
  if (result !== RESULTS.GRANTED) {
    openSettings(ALLOW_ACCESS_CAMERA);
    return '';
  }
  result = await checkSavePhotoPermission();
  if (result !== RESULTS.GRANTED) {
    openSettings(ALLOW_ACCESS_STORAGE);
    return '';
  }
  const response = await launchCamera({
    mediaType: 'photo',
    saveToPhotos: true,
    cameraType: 'front',
    quality: 0.8,
  });
  if (!response.assets) {
    return '';
  }
  const uri = response.assets[0].uri;
  if (!uri) {
    return '';
  }
  return uri;
};

export const selectPhoto = async () => {
  const result = await checkPhotoPermission();
  if (result !== RESULTS.GRANTED) {
    openSettings(ALLOW_ACCESS_STORAGE);
    return '';
  }
  const response = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.8,
  });
  if (!response.assets) {
    return '';
  }
  const uri = response.assets[0].uri;
  if (!uri) {
    return '';
  }
  return uri;
};

export const openImagePicker = (
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i?: number) => void | Promise<void>,
  ) => void,
  setImageUri: (image: string) => void,
) => {
  const options = [TAKE_PHOTO, SELECT_PHOTO, CANCEL];

  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
      },
    },
    async selectedIndex => {
      switch (selectedIndex) {
        case 0:
          setImageUri(await takePhoto());

          break;
        case 1:
          setImageUri(await selectPhoto());

          break;
      }
    },
  );
};
