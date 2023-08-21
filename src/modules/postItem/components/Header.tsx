import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {FOR_YOU} from '../../../constants/Config';
import FollowButton from '../../../components/FollowButton';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimeAgo} from '../../../utils/date';
import {
  AuthorAvatar,
  AuthorId,
  AuthorName,
  ConversationId,
  CreateTime,
} from '../../following/store/slice';
import {IsFollowed} from '../../recommend/store/slice';
import ChatButton from './ChatButton';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  followOrUnfollowUserAsync,
  operationUserId,
  scene,
  setOperationUserId,
  setScene,
  status,
} from '../../../stores/user/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {
  operationPostId,
  PostId,
  setOperationPostId,
} from '../../../stores/post/slice';

type Props = {
  authorId: AuthorId;
  authorAvatar: AuthorAvatar;
  postId: PostId;
  authorName?: AuthorName;
  createTime?: CreateTime;
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  isFollowed?: IsFollowed;
  conversationId?: ConversationId;
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const [isFollowed, setIsFollowed] = useState<IsFollowed>(
    props.isFollowed ? props.isFollowed : 0,
  );

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);
  const operationUserIdValue = useAppSelector(operationUserId);
  const operationPostIdValue = useAppSelector(operationPostId);

  useEffect(() => {
    if (
      statusValue === 'failed' &&
      sceneValue === 'postItem' &&
      operationUserIdValue === props.authorId &&
      operationPostIdValue === props.postId
    ) {
      const error = store.getState().user.error;

      showError(error);

      LayoutAnimation.easeInEaseOut();

      if (isFollowed) {
        setIsFollowed(0);

        return;
      }

      setIsFollowed(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handleFollow = () => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('postItem'));
    dispatch(setOperationUserId(props.authorId));
    dispatch(setOperationPostId(props.postId));

    if (isFollowed) {
      setIsFollowed(0);

      dispatch(followOrUnfollowUserAsync(0));

      return;
    }

    setIsFollowed(1);

    dispatch(followOrUnfollowUserAsync(1));
  };

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
            ? formatTimeAgo(props.createTime as CreateTime)
            : FOR_YOU}
        </Text>
      </View>

      {props.isFollowing || props.conversationId ? (
        <ChatButton />
      ) : isFollowed ? (
        <ChatButton />
      ) : (
        <FollowButton onPress={handleFollow} />
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
