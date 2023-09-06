import React, {useRef} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_phone from '../../../assets/images/icons/icon_phone.png';
import icon_pic from '../../../assets/images/icons/icon_picture.png';
import icon_camera from '../../../assets/images/icons/icon_camera.png';
import icon_mic from '../../../assets/images/icons/icon_mic.png';
import icon_gift from '../../../assets/images/icons/icon_gift.png';
import icon_add from '../../../assets/images/icons/icon_add_outlined.png';
import Gift, {GiftRef} from '../../gift/Gift';

type Props = {
  style: ViewStyle;
};

export default (props: Props) => {
  const giftRef = useRef<GiftRef>(null);

  return (
    <View style={[styles.root, props.style]}>
      {btnList.map((value, index) => {
        const handlePress = () => {
          if (index === 4) {
            giftRef.current?.show();
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={handlePress}>
            <Image source={value} />
          </TouchableOpacity>
        );
      })}

      <Gift ref={giftRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const btnList: ImageSourcePropType[] = [
  icon_phone,
  icon_pic,
  icon_camera,
  icon_mic,
  icon_gift,
  icon_add,
];
