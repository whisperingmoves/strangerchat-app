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

import {useEffect, useState} from 'react';
import {Image, ImageURISource} from 'react-native';

import {createCache} from '../utils';
import {Dimensions, ImageSource} from '../@types';

const CACHE_SIZE = 50;
const imageDimensionsCache = createCache(CACHE_SIZE);

const useImageDimensions = (image: ImageSource): Dimensions | null => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  const getImageDimensions = (image: ImageSource): Promise<Dimensions> => {
    return new Promise(resolve => {
      if (typeof image === 'number') {
        const cacheKey = `${image}`;
        let imageDimensions = imageDimensionsCache.get(cacheKey);

        if (!imageDimensions) {
          const {width, height} = Image.resolveAssetSource(image);
          imageDimensions = {width, height};
          imageDimensionsCache.set(cacheKey, imageDimensions);
        }

        resolve(imageDimensions);

        return;
      }

      // @ts-ignore
      if (image.uri) {
        const source = image as ImageURISource;

        const cacheKey = source.uri as string;

        const imageDimensions = imageDimensionsCache.get(cacheKey);

        if (imageDimensions) {
          resolve(imageDimensions);
        } else {
          // @ts-ignore
          Image.getSizeWithHeaders(
            source.uri as string,
            source.headers as {[index: string]: string},
            (width: number, height: number) => {
              imageDimensionsCache.set(cacheKey, {width, height});
              resolve({width, height});
            },
            () => {
              resolve({width: 0, height: 0});
            },
          );
        }
      } else {
        resolve({width: 0, height: 0});
      }
    });
  };

  let isImageUnmounted = false;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    getImageDimensions(image).then(dimensions => {
      if (!isImageUnmounted) {
        setDimensions(dimensions);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isImageUnmounted = true;
    };
  }, [image]);

  return dimensions;
};

export default useImageDimensions;
