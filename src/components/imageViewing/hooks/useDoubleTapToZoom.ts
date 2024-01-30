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

import React, {useCallback} from 'react';
import {NativeSyntheticEvent, NativeTouchEvent, ScrollView} from 'react-native';

import {Dimensions} from '../@types';

const DOUBLE_TAP_DELAY = 300;
let lastTapTS: number | null = null;

/**
 * This is iOS only.
 * Same functionality for Android implemented inside usePanResponder hook.
 */
function useDoubleTapToZoom(
  scrollViewRef: React.RefObject<ScrollView>,
  scaled: boolean,
  screen: Dimensions,
) {
  const handleDoubleTap = useCallback(
    (event: NativeSyntheticEvent<NativeTouchEvent>) => {
      const nowTS = new Date().getTime();
      const scrollResponderRef = scrollViewRef?.current?.getScrollResponder();

      if (lastTapTS && nowTS - lastTapTS < DOUBLE_TAP_DELAY) {
        const {pageX, pageY} = event.nativeEvent;
        let targetX = 0;
        let targetY = 0;
        let targetWidth = screen.width;
        let targetHeight = screen.height;

        // Zooming in
        // TODO: Add more precise calculation of targetX, targetY based on touch
        if (!scaled) {
          targetX = pageX / 2;
          targetY = pageY / 2;
          targetWidth = screen.width / 2;
          targetHeight = screen.height / 2;
        }

        // @ts-ignore
        scrollResponderRef?.scrollResponderZoomTo({
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
          animated: true,
        });
      } else {
        lastTapTS = nowTS;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scaled],
  );

  return handleDoubleTap;
}

export default useDoubleTapToZoom;
