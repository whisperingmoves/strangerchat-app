import {Alert, Linking, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {ActionSheetOptions} from '@expo/react-native-action-sheet/lib/typescript/types';

import {
  ALLOW_ACCESS_CAMERA,
  ALLOW_ACCESS_STORAGE,
  CANCEL,
  PERMISSION_REQUIRED,
  SELECT_PHOTO,
  SETTINGS,
  TAKE_PHOTO,
} from '../constants/Config';

const checkCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    return request(permission);
  }
  return result;
};

const checkPhotoPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : Number(Platform.Version) > 28
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    return request(permission);
  }
  return result;
};

const checkSavePhotoPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : Number(Platform.Version) > 28
      ? ''
      : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
  if (!permission) {
    return Promise.resolve(RESULTS.GRANTED);
  }
  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    return request(permission);
  }
  return result;
};

const openSettings = (message: string) => {
  Alert.alert(PERMISSION_REQUIRED, message, [
    {
      text: CANCEL,
      style: 'cancel',
    },
    {
      text: SETTINGS,
      onPress: () => Linking.openSettings(),
    },
  ]);
};

const takePhoto = async () => {
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
