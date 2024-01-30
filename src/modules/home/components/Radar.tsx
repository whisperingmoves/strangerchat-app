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

import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import icon_scanner from '../../../assets/images/icons/icon_scanner.png';
import icon_radial from '../../../assets/images/icons/icon_radial.png';
import Triangle from '../../../components/Triangle';

export default () => {
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    spinValue.setValue(0);

    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[styles.root, {transform: [{rotate: spinInterpolate}]}]}>
      <Image source={icon_scanner} style={styles.scanner} />

      <ImageBackground style={styles.indicators} source={icon_radial}>
        <Triangle />

        <View style={styles.center} />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  scanner: {
    position: 'absolute',
    bottom: 16,
  },
  indicators: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    width: 16,
    height: 16,
    borderRadius: 9,
    borderColor: '#FFF',
    borderWidth: 2,
    backgroundColor: '#8B5CFF',
  },
});
