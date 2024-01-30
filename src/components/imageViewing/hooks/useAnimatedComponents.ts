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

import {Animated} from 'react-native';

const INITIAL_POSITION = {x: 0, y: 0};
const ANIMATION_CONFIG = {
  duration: 200,
  useNativeDriver: true,
};

const useAnimatedComponents = () => {
  const headerTranslate = new Animated.ValueXY(INITIAL_POSITION);
  const footerTranslate = new Animated.ValueXY(INITIAL_POSITION);

  const toggleVisible = (isVisible: boolean) => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(headerTranslate.y, {...ANIMATION_CONFIG, toValue: 0}),
        Animated.timing(footerTranslate.y, {...ANIMATION_CONFIG, toValue: 0}),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(headerTranslate.y, {
          ...ANIMATION_CONFIG,
          toValue: -300,
        }),
        Animated.timing(footerTranslate.y, {
          ...ANIMATION_CONFIG,
          toValue: 300,
        }),
      ]).start();
    }
  };

  const headerTransform = headerTranslate.getTranslateTransform();
  const footerTransform = footerTranslate.getTranslateTransform();

  return [headerTransform, footerTransform, toggleVisible] as const;
};

export default useAnimatedComponents;
