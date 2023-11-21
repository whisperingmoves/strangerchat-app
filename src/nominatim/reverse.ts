import {getLocales} from 'react-native-localize';
import axiosInstance from './axios';

export type Lat = string;

export type Lon = string;

export interface ReverseRequest {
  lat: Lat;
  lon: Lon;
  format?: 'xml' | 'json' | 'jsonv2' | 'geojson' | 'geocodejson';
  'accept-language'?: string;
}

type Geocoding = {
  city?: string;
};

type Property = {
  geocoding: Geocoding;
};

type Feature = {
  properties: Property;
};

export interface ReverseResponse {
  features: Feature[];
}

export const reverse = async (
  request: ReverseRequest,
): Promise<ReverseResponse> => {
  if (!request.format) {
    request.format = 'geocodejson';
  }

  if (!request['accept-language']) {
    const locales = getLocales();

    if (locales.length > 0) {
      request['accept-language'] = locales[0].languageTag;
    }
  }

  const response = await axiosInstance.get('/reverse', {
    params: request,
  });

  return response.data;
};
