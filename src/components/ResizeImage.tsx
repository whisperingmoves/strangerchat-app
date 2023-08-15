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
