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

import {Image, ImageStyle, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LazyLoadImage} from 'react-native-lazy-load-image';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  photoUri?: string;
  defaultHeight: number;
  styles?: StyleProp<ImageStyle>;
};

export default ({photoUri, defaultHeight, styles: customStyles}: Props) => {
  const [height, setHeight] = useState<number>(defaultHeight);
  const [showWidth, setShowWidth] = useState<number>(0);

  useEffect(() => {
    if (!photoUri) {
      return;
    }
    Image.getSize(photoUri, (w: number, h: number) => {
      const showHeight = (showWidth * h) / w;
      setHeight(showHeight);
    });
  }, [height, photoUri, showWidth]);

  const imageStyle: ViewStyle = {
    height,
  };

  const handleLayoutChange = (event: {
    nativeEvent: {layout: {width: React.SetStateAction<number>}};
  }) => {
    setShowWidth(event.nativeEvent.layout.width);
  };

  return (
    <>
      {photoUri && (
        <LazyLoadImage
          color={'6C5FBC'}
          style={
            customStyles
              ? [styles.image, imageStyle, customStyles]
              : styles.image
          }
          source={{uri: photoUri}}
          fadeDuration={200}
          onLayout={handleLayoutChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
