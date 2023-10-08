import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Like from './Like';
import {
  AuthorAvatar,
  AuthorId,
  AuthorName,
  CommentId,
  Content,
  CreateTime,
  IsLiked,
} from '../store/slice';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimeAgo} from '../../../utils/date';

export type Props = {
  commentId: CommentId;
  userId: AuthorId;
  avatar: AuthorAvatar;
  username?: AuthorName;
  createTime: CreateTime;
  content: Content;
  isLiked?: IsLiked;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{uri: generateFullURL(props.avatar)}}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.usernameTxt}>
            {props.username ? props.username : getUsername(props.userId)}
          </Text>

          <Text style={styles.createTimeTxt}>
            {formatTimeAgo(props.createTime)}
          </Text>
        </View>

        <Like commentId={props.commentId} isLiked={props.isLiked} />
      </View>

      <Text style={styles.contentTxt}>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    resizeMode: 'cover',
  },
  info: {
    gap: 4,
    flex: 1,
    height: 'auto',
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
  contentTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginLeft: 46 + 10,
  },
});
