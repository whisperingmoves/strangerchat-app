import React from 'react';
import {PixelRatio, StyleSheet, useWindowDimensions, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import ResizeImage from './ResizeImage';
import {LazyLoadImage} from 'react-native-lazy-load-image';

type Props = {
  photoList: string[];
  isMarginLeft: boolean;
  style?: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const photoWidth = PixelRatio.roundToNearestPixel(
    (windowWidth - 22 * 2 - (props.isMarginLeft ? 50 + 10 : 0) - 2 * 10) / 3,
  );

  const photoStyle = {
    width: photoWidth,
    height: photoWidth,
  };

  return (
    <View style={[styles.root, props.style]}>
      {props.photoList.length === 1 ? (
        <ResizeImage
          photoUri={props.photoList[0]}
          defaultHeight={145}
          styles={styles.resizePhoto}
        />
      ) : (
        props.photoList.map((value, index) => (
          <LazyLoadImage
            key={index}
            color={'6C5FBC'}
            style={[styles.photo, photoStyle]}
            source={{uri: value}}
            fadeDuration={200}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    overflow: 'hidden',
    rowGap: 10,
    columnGap: 10,
  },
  photo: {
    resizeMode: 'cover',
    borderRadius: 15,
  },
  resizePhoto: {width: 105},
});
