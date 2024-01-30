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

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  LayoutAnimation,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import TopUp from '../topUp/TopUp';
import {HandleSend} from './store/slice';

export interface GiftRef {
  show: () => void;
  hide: () => void;
}

type Props = {
  handleSend: HandleSend;
};

export default forwardRef((props: Props, ref) => {
  const {height: windowHeight} = useWindowDimensions();

  const [visible, setVisible] = useState<boolean>(false);

  const [giftTranslateY, setGiftTranslateY] = useState(352);

  const [topUpTranslateY, setTopUpTranslateY] = useState(windowHeight * 0.86);

  const show = () => {
    setVisible(true);

    setGiftTranslateY(0);
  };

  const hideTopUp = useCallback(() => {
    setTopUpTranslateY(windowHeight * 0.86);
  }, [windowHeight]);

  const hide = () => {
    setGiftTranslateY(352);

    setVisible(false);

    hideTopUp();
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const giftStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: giftTranslateY,
      },
    ],
  };

  const topUpStyle: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: topUpTranslateY,
      },
    ],
  };

  const handleTopUpPress = () => {
    // setGiftTranslateY(352);
    setTopUpTranslateY(0);
  };

  const handleTopUpDrag = (y: number) => {
    setTopUpTranslateY(previous => {
      if (y < 0) {
        return previous;
      } else if (y > windowHeight * 0.86) {
        return previous;
      }
      return y;
    });
  };

  const handleTopUpRelease = (y: number) => {
    if (y > (windowHeight * 0.86) / 2) {
      LayoutAnimation.spring();

      hideTopUp();
      // setGiftTranslateY(0);
    }
  };

  const handleResponderGrant = (event: GestureResponderEvent) => {
    event.preventDefault();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType={'fade'}>
      <View
        style={styles.root}
        onResponderGrant={handleResponderGrant}
        onResponderRelease={hide}
        onStartShouldSetResponder={() => true}>
        {giftTranslateY < 352 && (
          <TouchableOpacity style={[styles.gift, giftStyle]} activeOpacity={1}>
            <NavigationBar />

            <Footer
              handleTopUpPress={handleTopUpPress}
              handleSend={props.handleSend}
              hide={hide}
            />
          </TouchableOpacity>
        )}

        {topUpTranslateY < windowHeight * 0.86 && (
          <TopUp
            style={[styles.topUp, topUpStyle]}
            handleTopUpDrag={handleTopUpDrag}
            handleTopUpRelease={handleTopUpRelease}
            hideTopUp={hideTopUp}
          />
        )}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000B2',
  },
  gift: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFF',
    width: '100%',
    height: 352,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  navigationBar: {
    marginTop: 4,
  },
  topUp: {
    position: 'absolute',
    bottom: 0,
  },
});
