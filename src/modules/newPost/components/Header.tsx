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
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_close from '../../../assets/images/icons/icon_close.png';
import icon_send from '../../../assets/images/icons/icon_send.png';
import {PUBLISH} from '../../../constants/newPost/Config';
import {useAppSelector} from '../../../hooks';
import {content} from '../store/slice';

type Props = {
  onClose: () => void;
  onPublish: () => void;
};

export default (props: Props) => {
  const contentValue = useAppSelector(content);

  const publishIconStyle: ImageStyle = {
    tintColor: contentValue ? '#8B5CFF' : '#C7C4CC',
  };

  const publishTxtStyle: TextStyle = {
    color: contentValue ? '#8B5CFF' : '#C7C4CC',
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onClose}>
        <Image source={icon_close} style={styles.closeImg} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.publishBtn}
        disabled={!contentValue}
        onPress={props.onPublish}>
        <Image source={icon_send} style={publishIconStyle} />
        <Text style={[styles.publishTxt, publishTxtStyle]}>{PUBLISH}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F1F0F3',
    borderBottomWidth: 1,
  },
  closeImg: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
  publishBtn: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  publishTxt: {
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
