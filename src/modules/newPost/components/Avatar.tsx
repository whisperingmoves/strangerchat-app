import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from '../store/slice';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: Avatar;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{uri: generateFullURL(props.avatar)}}
        style={styles.avatar}
      />
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
});
