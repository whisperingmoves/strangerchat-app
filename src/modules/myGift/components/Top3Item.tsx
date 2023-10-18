import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Avatar from './Avatar';
import {GiftData} from '../../../apis/gift/getReceivedGifts';
import {getUsername} from '../../helper';

export type Top3Item = GiftData;

type Props = Top3Item & {style: StyleProp<ViewStyle>};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Avatar avatar={props.avatar} currentRanking={props.currentRanking} />

      <Text style={styles.countTxt}>{props.count}</Text>

      <Text style={styles.usernameTxt}>
        {props.username ? props.username : getUsername(props.userId)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 6,
    alignItems: 'center',
  },
  countTxt: {
    color: '#FFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  usernameTxt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
