import React from 'react';
import {ImageBackground, StyleSheet, useWindowDimensions} from 'react-native';

import icon_vector from '../../../assets/images/icons/icon_vector.png';
import Radar from './Radar';
import NearBy from './NearBy';

export default () => {
  const {width: windowWidth} = useWindowDimensions();

  const insetStyle = {
    width: windowWidth,
    height: windowWidth,
  };

  return (
    <ImageBackground
      style={[insetStyle, styles.root]}
      source={icon_vector}
      imageStyle={styles.bgImage}>
      <Radar />

      <NearBy style={styles.nearBy} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  nearBy: {
    position: 'absolute',
    top: 0,
  },
});
