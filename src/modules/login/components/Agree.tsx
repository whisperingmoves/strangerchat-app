import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_select from '../../../assets/icon_select.png';
import {
  AGREE_TO_OUR,
  AND,
  DATA_POLICY,
  TERMS,
} from '../../../constants/login/Config';
import WebviewModal, {WebviewModalRef} from '../../../components/WebviewModal';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const webviewModalRef = useRef<WebviewModalRef>();

  const handlePress = () => {
    webviewModalRef.current?.show('https://baidu.com');
  };

  return (
    <>
      <WebviewModal ref={webviewModalRef} />

      <View style={[styles.root, props.style]}>
        <TouchableOpacity activeOpacity={0.7} style={styles.selectBtn}>
          <Image source={icon_select} />
        </TouchableOpacity>

        <Text style={styles.agreeTxt}>{AGREE_TO_OUR}</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <Text style={styles.termsTxt}>{TERMS}</Text>
        </TouchableOpacity>

        <Text style={styles.agreeTxt}>{AND}</Text>

        <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
          <Text style={styles.termsTxt}>{DATA_POLICY}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBtn: {
    marginRight: 6,
  },
  agreeTxt: {
    color: '#8E8895',
    fontSize: 12,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  termsTxt: {
    color: '#8B5CFF',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
