import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_bubble from '../../../assets/images/icons/icon_bubble.png';
import {Distance, UserId, Username} from '../store/slice';
import {Avatar} from '../../avatar/store/slice';
import {AWAY_FROM} from '../../../constants/home/Config';
import {getUsername} from '../helper';

type Props = {
  style: StyleProp<ViewStyle>;
  userId: UserId;
  username?: Username;
  distance?: Distance;
  avatar: Avatar;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <View>
        <Text style={styles.txt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        {props.distance && (
          <Text style={styles.txt}>{AWAY_FROM(`${props.distance} km`)}</Text>
        )}
      </View>

      <ImageBackground
        source={icon_bubble}
        style={styles.avatarBg}
        imageStyle={styles.avatarBgImg}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={{uri: props.avatar}} style={styles.avatar} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 38,
    width: 122,
    borderRadius: 19,
    backgroundColor: '#00000033',
    paddingLeft: 12,
    paddingRight: 22,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    color: '#FFFFFF',
    fontSize: 12,
  },
  avatarBg: {
    width: 38,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -18,
  },
  avatarBgImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: 'cover',
  },
});
