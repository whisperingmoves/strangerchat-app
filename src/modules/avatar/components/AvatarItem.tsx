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

import React from 'react';
import {
  Image,
  ImageBackground,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_checked from '../../../assets/images/icons/icon_checked.png';
import icon_dialog from '../../../assets/images/icons/icon_dialog.png';
import {UPLOAD} from '../../../constants/avatar/Config';
import {Avatar} from '../store/slice';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: ImageSourcePropType;
  index: number;
  selected: boolean;
  onSelected: (index: number) => void;
  size: number;
  avatarUri: Avatar;
};

export default (props: Props) => {
  const avatarUri = props.avatarUri;

  const handlePress = () => {
    LayoutAnimation.easeInEaseOut();

    props.onSelected(props.index);
  };

  const containerStyle: StyleProp<ViewStyle> = {
    width: props.size,
    height: props.size,
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View
        style={[
          styles.container,
          containerStyle,
          props.selected ? styles.selected : {},
        ]}>
        {props.index === 8 && (
          <ImageBackground
            source={avatarUri ? {uri: generateFullURL(avatarUri)} : icon_dialog}
            style={avatarUri ? styles.uploadedBg : styles.uploadBg}
            imageStyle={styles.uploadBgImage}>
            {!avatarUri && <Text style={styles.uploadTxt}>{UPLOAD}</Text>}
          </ImageBackground>
        )}

        {props.index !== 8 && (
          <Image source={props.avatar} style={styles.avatar} />
        )}

        {props.index === 8 && !avatarUri && (
          <Image source={props.avatar} style={styles.avatar} />
        )}
      </View>

      {props.selected && <Image source={icon_checked} style={styles.checked} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    backgroundColor: '#F1F0F3',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  selected: {
    borderWidth: 4,
    borderColor: '#8B5CFF',
  },
  avatar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  checked: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  uploadBg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
    height: '34%',
    position: 'absolute',
    top: '22%',
  },
  uploadedBg: {
    width: '100%',
    height: '100%',
  },
  uploadBgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadTxt: {
    color: '#8B5CFF',
    fontSize: 14,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
