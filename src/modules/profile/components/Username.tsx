import React, {useState} from 'react';
import {
  Image,
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_edit from '../../../assets/images/icons/icon_edit.png';

type Props = {
  username: string;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const [textWidth, setTextWidth] = useState(102);

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  const btnStyle: ImageStyle = {
    left: textWidth + 4,
  };

  return (
    <View style={[styles.root, props.style]}>
      <Text style={styles.txt} onLayout={handleLayoutChange}>
        {props.username}
      </Text>

      <TouchableOpacity activeOpacity={0.7} style={[styles.btn, btnStyle]}>
        <Image source={icon_edit} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  btn: {
    position: 'absolute',
  },
  icon: {
    tintColor: '#FFF',
  },
});
