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

import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_next from '../../../assets/images/icons/icon_next.png';
import {AppDispatch} from '../../../stores/store';
import {useAppDispatch} from '../../../hooks';

export type Props = {
  icon: ImageSourcePropType;
  label: string;
  description?: string;
  target?: string;
  callback?: (
    dispatch?: AppDispatch,
    navigation?: StackNavigationProp<any>,
  ) => void;
};

export default (props: Props & {style: StyleProp<ViewStyle>}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    if (props.target) {
      navigation.push(props.target);
    }

    if (props.callback) {
      props.callback(dispatch, navigation);
    }
  }, [dispatch, navigation, props]);

  return (
    <View style={[styles.root, props.style]}>
      <Image source={props.icon} />

      <Text style={styles.labelTxt}>{props.label}</Text>

      {props.description && (
        <Text style={styles.descTxt}>{props.description}</Text>
      )}

      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
        <Image source={icon_next} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  labelTxt: {
    flex: 1,
    height: 'auto',
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  descTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
