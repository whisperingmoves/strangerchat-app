import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {hasLocationPermission} from './permission';

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
          () => {
            resolve(undefined);
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
