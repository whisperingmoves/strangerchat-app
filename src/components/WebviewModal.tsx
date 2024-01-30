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
