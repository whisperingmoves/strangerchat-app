import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import Tag from './Tag';
import Match from './Match';
import Details from './Details';
import {OpponentAvatar} from '../../chat/store/slice';
import {Avatar} from '../../../stores/user/slice';
import {generateFullURL} from '../../helper';

type Props = {
  tag: string;
  percentage: string;
  userAvatar: Avatar;
  opponentAvatar: OpponentAvatar;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <Image
        style={[styles.avatar, styles.opponentAvatar]}
        source={{uri: generateFullURL(props.opponentAvatar)}}
      />

      <Image
        style={[styles.avatar, styles.userAvatar]}
        source={{uri: generateFullURL(props.userAvatar)}}
      />

      <View style={styles.tagContainer}>
        <Tag tag={props.tag} />

        <Match percentage={props.percentage} />
      </View>

      <Details style={styles.details} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 106,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F0F3',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  opponentAvatar: {
    position: 'absolute',
    left: 20,
  },
  userAvatar: {
    position: 'absolute',
    left: 20 + 50 + 6,
  },
  tagContainer: {
    gap: 10,
    alignItems: 'center',
  },
  details: {
    position: 'absolute',
    right: 0,
  },
});
