import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {CANCEL, PERMISSION_REQUIRED, SETTINGS} from '../constants/Config';
import {
  DO_NOT_USE_LOCATION,
  GO_TO_SETTINGS,
  LOCATION_PERMISSION_DENIED,
  LOCATION_PERMISSION_DENIED_BY_USER,
  LOCATION_PERMISSION_REVOKED_BY_USER,
  TURN_ON_LOCATION_TITLE,
  UNABLE_TO_OPEN_SETTINGS,
} from '../constants/geolocation/Config';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';

export const checkCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    return request(permission);
  }
  return result;
};

export const checkPhotoPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : Number(Platform.Version) >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const result = await check(permission);
  if (result === RESULTS.DENIED) {
    return request(permission);
  }
  return result;
};

export const checkSavePhotoPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : Number(Platform.Version) >= 33
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

export const openSettings = (message: string) => {
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

export type AudioRecordPermission =
  | 'ios.permission.MICROPHONE'
  | (
      | 'android.permission.WRITE_EXTERNAL_STORAGE'
      | 'android.permission.READ_EXTERNAL_STORAGE'
      | 'android.permission.RECORD_AUDIO'
    );

export type AudioRecordPermissions = AudioRecordPermission[];

export const checkAudioRecordPermission = async () => {
  const permissions: AudioRecordPermissions =
    Platform.OS === 'ios'
      ? []
      : Number(Platform.Version) >= 33
      ? [PERMISSIONS.ANDROID.RECORD_AUDIO]
      : [
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ];

  let permissionStatusMap = await checkMultiple(permissions);

  const requestPermissions: AudioRecordPermissions = [];

  for (const permission in permissionStatusMap) {
    const status = permissionStatusMap[permission as AudioRecordPermission];

    if (status === RESULTS.DENIED) {
      requestPermissions.push(permission as AudioRecordPermission);
    }
  }

  if (requestPermissions.length) {
    const requestPermissionStatusMap = await requestMultiple(
      requestPermissions,
    );

    for (const requestPermission in requestPermissionStatusMap) {
      permissionStatusMap[requestPermission as AudioRecordPermission] =
        requestPermissionStatusMap[requestPermission as AudioRecordPermission];
    }
  }

  return permissionStatusMap;
};

export const hasLocationPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert(UNABLE_TO_OPEN_SETTINGS);
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert(LOCATION_PERMISSION_DENIED);
  }

  if (status === 'disabled') {
    Alert.alert(TURN_ON_LOCATION_TITLE(appConfig.displayName), '', [
      {text: GO_TO_SETTINGS, onPress: openSetting},
      {text: DO_NOT_USE_LOCATION, onPress: () => {}},
    ]);
  }

  return false;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return await hasLocationPermissionIOS();
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(LOCATION_PERMISSION_DENIED_BY_USER, ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(LOCATION_PERMISSION_REVOKED_BY_USER, ToastAndroid.LONG);
  }

  return false;
};
