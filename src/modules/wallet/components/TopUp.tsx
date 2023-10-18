import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  LayoutAnimation,
  Modal,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import TopUp from '../../topUp/TopUp';

export interface Ref {
  show: () => void;
  hide: () => void;
}

export default forwardRef(({}, ref) => {
  const {height: windowHeight} = useWindowDimensions();

  const [visible, setVisible] = useState<boolean>(false);

  const [topUpTranslateY, setTopUpTranslateY] = useState(0);

  const show = useCallback(() => {
    setTopUpTranslateY(0);

    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setTopUpTranslateY(windowHeight * 0.86);

    setVisible(false);
  }, [windowHeight]);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const topUpStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      transform: [
        {
          translateY: topUpTranslateY,
        },
      ],
    };
  }, [topUpTranslateY]);

  const handleTopUpDrag = useCallback(
    (y: number) => {
      setTopUpTranslateY(previous => {
        if (y < 0) {
          return previous;
        } else if (y > windowHeight * 0.86) {
          return previous;
        }
        return y;
      });
    },
    [windowHeight],
  );

  const handleTopUpRelease = useCallback(
    (y: number) => {
      if (y > (windowHeight * 0.86) / 2) {
        LayoutAnimation.spring();

        hide();
      }
    },
    [hide, windowHeight],
  );

  const handleResponderGrant = useCallback((event: GestureResponderEvent) => {
    event.preventDefault();
  }, []);

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
        {topUpTranslateY < windowHeight * 0.86 && (
          <TopUp
            style={[styles.topUp, topUpStyle]}
            handleTopUpDrag={handleTopUpDrag}
            handleTopUpRelease={handleTopUpRelease}
            hideTopUp={hide}
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
