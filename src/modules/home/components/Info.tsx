import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {Avatar as AvatarType} from '../../avatar/store/slice';
import {CreateTime, Online, Username} from '../store/slice';
import Avatar from './Avatar';
import Detail from './Detail';

type Props = {
  avatar: AvatarType;
  username: Username;
  createTime: CreateTime;
  online?: Online;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <Avatar avatar={props.avatar} online={props.online} />

      <Detail username={props.username} createTime={props.createTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
