import React from 'react';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import icon_champion_crown from '../../../assets/images/icons/icon_champion_crown.png';
import icon_second_crown from '../../../assets/images/icons/icon_second_crown.png';
import icon_third_crown from '../../../assets/images/icons/icon_third_crown.png';
import icon_champion_wreath from '../../../assets/images/icons/icon_champion_wreath.png';
import icon_second_wreath from '../../../assets/images/icons/icon_second_wreath.png';
import icon_third_wreath from '../../../assets/images/icons/icon_third_wreath.png';
import {Avatar, CurrentRanking} from '../store/slice';
import {generateFullURL} from '../../helper';

type Props = {
  avatar: Avatar;
  currentRanking: CurrentRanking;
};

export default (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.root}>
      <Image source={CROWN_MAP[props.currentRanking]} style={styles.crown} />

      <LinearGradient
        colors={GRADIENT_COLOR[props.currentRanking]}
        style={styles.avatarBtn}>
        <Image
          source={{uri: generateFullURL(props.avatar)}}
          style={styles.avatar}
        />
      </LinearGradient>

      <Image source={WREATH_MAP[props.currentRanking]} style={styles.wreath} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  crown: {
    marginBottom: -2,
  },
  avatarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    resizeMode: 'cover',
  },
  wreath: {
    marginTop: -(72 - 8),
  },
});

type GradientColor = {
  [key: number]: string[];
};

const GRADIENT_COLOR: GradientColor = {
  1: ['#FFCB5B', '#FF9838'],
  2: ['#62DDFF', '#40B2FF'],
  3: ['#FF5FB0', '#FF4288'],
};

type CrownMap = {
  [key: number]: ImageSourcePropType;
};

const CROWN_MAP: CrownMap = {
  1: icon_champion_crown,
  2: icon_second_crown,
  3: icon_third_crown,
};

const WREATH_MAP: CrownMap = {
  1: icon_champion_wreath,
  2: icon_third_wreath,
  3: icon_second_wreath,
};
