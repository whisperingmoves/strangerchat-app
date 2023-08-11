import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import BackHeader from './BackHeader';

export interface WebviewModalRef {
  show: (uri: string) => void;
  hide: () => void;
}

export default forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);

  const [webviewSource, setWebviewSource] = useState({uri: 'about:blank'});

  const show = (uri: string) => {
    setWebviewSource({uri});
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType={'fade'}>
      <View style={[styles.root, statusBarStyle]}>
        <BackHeader onPress={hide} style={styles.backHeader} />

        <WebView source={webviewSource} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backHeader: {
    marginTop: 16,
    marginLeft: 20,
  },
});
