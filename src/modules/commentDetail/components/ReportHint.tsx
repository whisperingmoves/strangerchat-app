import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_eyes from '../../../assets/images/icons/icon_eyes.png';
import icon_close from '../../../assets/images/icons/icon_close.png';
import {REPORT_HINT} from '../../../constants/commentDetail/Config';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const [hidden, setHidden] = useState(false);

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    setHidden(!hidden);
  }, [hidden]);

  const hiddenStyle = useMemo(
    () => (hidden ? {height: 0, opacity: 0} : {}),
    [hidden],
  );

  return (
    <View style={[styles.root, props.style, hiddenStyle]}>
      <Image source={icon_eyes} />

      <Text style={styles.txt}>{REPORT_HINT}</Text>

      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <Image source={icon_close} style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 38,
    marginHorizontal: -20,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#8E8895',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
    height: 'auto',
  },
  closeIcon: {
    width: 8,
    height: 8,
    resizeMode: 'cover',
  },
});
