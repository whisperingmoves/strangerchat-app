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
