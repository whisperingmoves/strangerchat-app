import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {
  DO_NOT_USE_LOCATION,
  GO_TO_SETTINGS,
  LOCATION_PERMISSION_DENIED,
  LOCATION_PERMISSION_DENIED_BY_USER,
  LOCATION_PERMISSION_REVOKED_BY_USER,
  TURN_ON_LOCATION_TITLE,
  UNABLE_TO_OPEN_SETTINGS,
} from '../constants/geolocation/Config';
import appConfig from '../../app.json';

const hasPermissionIOS = async () => {
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

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return await hasPermissionIOS();
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

export const getLocation = (): Promise<GeoPosition | undefined> => {
  return new Promise((resolve, reject) => {
    hasLocationPermission()
      .then(hasPermission => {
        if (!hasPermission) {
          return resolve(undefined);
        }

        Geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          error => {
            reject(error);
          },
          {
            accuracy: {
              android: 'high',
              ios: 'best',
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            forceLocationManager: true,
            showLocationDialog: true,
          },
        );
      })
      .catch(error => reject(error));
  });
};
