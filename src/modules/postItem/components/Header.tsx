import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {CHAT, FOR_YOU} from '../../../constants/Config';

import icon_more from '../../../assets/images/icons/icon_more.png';
import FollowButton from '../../../components/FollowButton';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimeAgo} from '../../../utils/date';
import {
  AuthorAvatar,
  AuthorId,
  AuthorName,
  CreateTime,
} from '../../following/store/slice';
import {IsFollowed} from '../../recommend/store/slice';

type Props = {
  authorId: AuthorId;
  authorAvatar: AuthorAvatar;
  authorName?: AuthorName;
  createTime?: CreateTime;
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  isFollowed?: IsFollowed;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={{uri: generateFullURL(props.authorAvatar)}}
          style={styles.avatarImg}
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.usernameTxt}>
          {props.authorName ? props.authorName : getUsername(props.authorId)}
        </Text>
        <Text style={styles.createTimeTxt}>
          {props.isFollowing || props.isLatest
            ? formatTimeAgo(props.createTime as number)
            : FOR_YOU}
        </Text>
      </View>

      {props.isFollowing ? (
        <TouchableOpacity activeOpacity={0.7} style={styles.chatBtn}>
          <Text style={styles.chatTxt}>{CHAT}</Text>
        </TouchableOpacity>
      ) : props.isFollowed ? (
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={icon_more} />
        </TouchableOpacity>
      ) : (
        <FollowButton />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    height: 'auto',
    gap: 4,
  },
  usernameTxt: {
    color: '#8E8895',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  createTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  chatBtn: {
    width: 52,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#8B5CFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatTxt: {
    color: '#8B5CFF',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
