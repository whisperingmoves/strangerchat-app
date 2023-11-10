import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import icon_system from '../../../assets/images/icons/icon_system.png';
import icon_wallet from '../../../assets/images/icons/icon_wallet.png';

type Props = {
  type: 'purchased' | 'reminder';
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        colors={
          props.type === 'purchased'
            ? ['#D988FF', '#8B5CFF']
            : ['#62DDFF', '#40B2FF']
        }
        style={styles.root}>
        <Image
          source={props.type === 'purchased' ? icon_wallet : icon_system}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
