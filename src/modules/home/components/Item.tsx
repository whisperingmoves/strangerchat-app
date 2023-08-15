import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {
  CreateTime,
  FirstImage,
  Online,
  Relation as RelationType,
  UserId,
  Username,
} from '../store/slice';
import {Avatar} from '../../avatar/store/slice';
import Relation from './Relation';
import Info from './Info';
import {getUsername} from '../helper';
import {generateFullURL} from '../../helper';

export type Props = {
  relation?: RelationType;
  firstImage?: FirstImage;
  avatar: Avatar;
  online?: Online;
  userId: UserId;
  username?: Username;
  createTime: CreateTime;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <ImageBackground
        style={styles.root}
        source={{
          uri: props.firstImage
            ? generateFullURL(props.firstImage)
            : generateFullURL(props.avatar),
        }}
        imageStyle={styles.bg}>
        {props.relation && (
          <Relation relation={props.relation} style={styles.relation} />
        )}

        <Info
          style={styles.info}
          avatar={props.avatar}
          username={props.username ? props.username : getUsername(props.userId)}
          createTime={props.createTime}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 126,
    height: 176,
    borderRadius: 10,
  },
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  relation: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  info: {
    position: 'absolute',
    bottom: 10,
  },
});
