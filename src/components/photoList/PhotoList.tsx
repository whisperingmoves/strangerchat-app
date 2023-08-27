import React, {useEffect, useState} from 'react';
import {
  PixelRatio,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import ResizeImage from '../ResizeImage';
import ImageView from '../imageViewing';
import {LazyLoadImage} from 'react-native-lazy-load-image';
import ImageFooter from './ImageFooter';
import ImageHeader from './ImageHeader';

type Props = {
  photoList: string[];
  isMarginLeft: boolean;
  style?: StyleProp<ViewStyle>;
  onDelete?: (imageIndex: number) => void;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const photoWidth = PixelRatio.roundToNearestPixel(
    (windowWidth - 22 * 2 - (props.isMarginLeft ? 50 + 10 : 0) - 2 * 10) / 3,
  );

  const images = props.photoList.map(url => ({
    uri: url,
  }));

  const photoStyle = {
    width: photoWidth,
    height: photoWidth,
  };

  const presentationStyle =
    Platform.OS === 'android' ? 'overFullScreen' : 'fullScreen';

  const onRequestClose = () => setIsVisible(false);

  const renderHeader = ({imageIndex: imageIdx}: {imageIndex: number}) => {
    return (
      <ImageHeader
        onDelete={props.onDelete}
        onRequestClose={onRequestClose}
        imageIndex={imageIdx}
      />
    );
  };

  const renderFooter = ({imageIndex: imageIdx}: {imageIndex: number}) => (
    <ImageFooter imageIndex={imageIdx} imagesCount={images.length} />
  );

  useEffect(() => {
    if (!images.length) {
      setIsVisible(false);
    }
  }, [images]);

  return (
    <View style={[styles.root, props.style]}>
      {props.photoList.length === 1 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setImageIndex(0);
            setIsVisible(true);
          }}>
          <ResizeImage
            photoUri={props.photoList[0]}
            defaultHeight={145}
            styles={styles.resizePhoto}
          />
        </TouchableOpacity>
      ) : (
        props.photoList.map((value, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              setImageIndex(index);
              setIsVisible(true);
            }}>
            <LazyLoadImage
              color={'6C5FBC'}
              style={[styles.photo, photoStyle]}
              source={{uri: value}}
              fadeDuration={200}
            />
          </TouchableOpacity>
        ))
      )}

      <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={onRequestClose}
        presentationStyle={presentationStyle}
        FooterComponent={renderFooter}
        HeaderComponent={renderHeader}
      />
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
