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
