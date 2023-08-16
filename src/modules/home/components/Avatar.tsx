import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from '../../avatar/store/slice';
import {Online} from '../store/slice';
import OnlineIndicator from '../../../components/OnlineIndicator';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: Avatar;
  online?: Online;
};

export default (props: Props) => {
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.7}>
      <Image
        source={{uri: generateFullURL(props.avatar)}}
        style={styles.avatar}
      />

      {props.online === 1 && <OnlineIndicator style={styles.onlineIndicator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#AFE6F5',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
