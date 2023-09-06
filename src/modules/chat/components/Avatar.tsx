import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import OnlineIndicator from '../../../components/OnlineIndicator';
import {OpponentAvatar, OpponentOnlineStatus} from '../store/slice';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: OpponentAvatar;
  online?: OpponentOnlineStatus;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{uri: generateFullURL(props.avatar)}}
        style={styles.avatar}
      />

      {props.online === 1 && <OnlineIndicator style={styles.onlineIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
