import React from 'react';
import {PixelRatio, StyleSheet, useWindowDimensions, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import AvatarItem from './AvatarItem';

import avatar_boy_1 from '../../../assets/images/avatars/male/avatar_boy_1.png';
import avatar_boy_2 from '../../../assets/images/avatars/male/avatar_boy_2.png';
import avatar_boy_3 from '../../../assets/images/avatars/male/avatar_boy_3.png';
import avatar_boy_4 from '../../../assets/images/avatars/male/avatar_boy_4.png';
import avatar_boy_5 from '../../../assets/images/avatars/male/avatar_boy_5.png';
import avatar_boy_6 from '../../../assets/images/avatars/male/avatar_boy_6.png';
import avatar_boy_7 from '../../../assets/images/avatars/male/avatar_boy_7.png';
import avatar_boy_8 from '../../../assets/images/avatars/male/avatar_boy_8.png';

import avatar_girl_1 from '../../../assets/images/avatars/female/avatar_girl_1.png';
import avatar_girl_2 from '../../../assets/images/avatars/female/avatar_girl_2.png';
import avatar_girl_3 from '../../../assets/images/avatars/female/avatar_girl_3.png';
import avatar_girl_4 from '../../../assets/images/avatars/female/avatar_girl_4.png';
import avatar_girl_5 from '../../../assets/images/avatars/female/avatar_girl_5.png';
import avatar_girl_6 from '../../../assets/images/avatars/female/avatar_girl_6.png';
import avatar_girl_7 from '../../../assets/images/avatars/female/avatar_girl_7.png';
import avatar_girl_8 from '../../../assets/images/avatars/female/avatar_girl_8.png';

import icon_spying from '../../../assets/images/icons/icon_spying.png';
import {Avatar} from '../store/slice';
import {Gender} from '../../gender/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  handleImagePicker: () => void;
  avatarUri: Avatar;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  gender: Gender;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const avatarSize = PixelRatio.roundToNearestPixel(
    (windowWidth - 30 * 2 - 20 * 2) / 3,
  );

  const AVATAR_LIST =
    props.gender === 'male' ? AVATAR_BOY_LIST : AVATAR_GIRL_LIST;

  return (
    <View style={[styles.root, props.style]}>
      {AVATAR_LIST.map((value, index) => (
        <AvatarItem
          key={index}
          avatar={value}
          index={index}
          selected={index === props.selectedIndex}
          onSelected={props.setSelectedIndex}
          size={avatarSize}
          avatarUri={props.avatarUri}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 20,
  },
});

export const AVATAR_BOY_LIST: ImageSourcePropType[] = [
  avatar_boy_1,
  avatar_boy_2,
  avatar_boy_3,
  avatar_boy_4,
  avatar_boy_5,
  avatar_boy_6,
  avatar_boy_7,
  avatar_boy_8,
  icon_spying,
];

export const AVATAR_GIRL_LIST: ImageSourcePropType[] = [
  avatar_girl_1,
  avatar_girl_2,
  avatar_girl_3,
  avatar_girl_4,
  avatar_girl_5,
  avatar_girl_6,
  avatar_girl_7,
  avatar_girl_8,
  icon_spying,
];
