import React from 'react';
import {
  Image,
  ImageStyle,
  PixelRatio,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import ResizeImage from '../../../components/ResizeImage';

type Props = {
  photoList: ImageSourcePropType[];
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const {width: windowsWidth} = useWindowDimensions();

  const imageSize = PixelRatio.roundToNearestPixel(
    (windowsWidth - 20 * 2 - 10 * 2) / 3,
  );

  const imageStyle: StyleProp<ImageStyle> = {
    width: imageSize,
    height: imageSize,
    borderRadius: PixelRatio.roundToNearestPixel(imageSize / 8),
  };

  return (
    <View style={[styles.root, props.style]}>
      {props.photoList.length === 1 ? (
        <ResizeImage
          photoUri={Image.resolveAssetSource(props.photoList[0]).uri}
          defaultHeight={106}
          styles={styles.resizePhoto}
        />
      ) : (
        props.photoList.map((value, index) => {
          return (
            <TouchableOpacity key={index} activeOpacity={0.7}>
              <Image source={value} style={[imageStyle, styles.img]} />
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  resizePhoto: {
    width: 106,
  },
  img: {
    resizeMode: 'cover',
  },
});
