// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import {
  IsBlocked,
  IsFollowed,
  UpdateListItemCallback,
} from '../../recommend/store/slice';
import ChatButton from './ChatButton';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  followOrUnfollowUserAsync,
  operationUserId,
  resetStatus,
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
import {conversationList} from '../../chat/store/slice';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  authorId: AuthorId;
  authorAvatar: AuthorAvatar;
  postId: PostId;
  authorName?: AuthorName;
  createTime?: CreateTime;
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  isCommentDetail?: boolean;
  isFollowed?: IsFollowed;
  isBlocked?: IsBlocked;
  conversationId?: ConversationId;
  style: StyleProp<ViewStyle>;
  updateListItemCallback?: UpdateListItemCallback;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();
  const [isFollowed, setIsFollowed] = useState<IsFollowed>(0);

  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);
  const operationUserIdValue = useAppSelector(operationUserId);
  const operationPostIdValue = useAppSelector(operationPostId);
  const conversationListValue = useAppSelector(conversationList);

  const userId = store.getState().user.userId;

  let conversationId = props.conversationId;
  let clientConversationId: ConversationId | undefined;

  const conversationIndex = conversationListValue.findIndex(
    item => item.opponentUserId === props.authorId,
  );

  if (conversationIndex !== -1) {
    const conversation = conversationListValue[conversationIndex];

    if (!conversationId && conversation.conversationId) {
      conversationId = conversation.conversationId;
    }

    if (conversation.clientConversationId) {
      clientConversationId = conversation.clientConversationId;
    }
  }

  useEffect(() => {
    setIsFollowed(
      props.isFollowing ? 1 : props.isFollowed ? props.isFollowed : 0,
    );
  }, [props.isFollowed, props.isFollowing]);

  const handleStatusChange = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    const followValue = isFollowed ? 0 : 1;

    setIsFollowed(followValue);
  }, [isFollowed]);

  useEffect(() => {
    const isSameAuthor = operationUserIdValue === props.authorId;
    const isSamePost = operationPostIdValue === props.postId;

    if (
      statusValue === 'failed' &&
      sceneValue === 'postItem' &&
      isSameAuthor &&
      isSamePost
    ) {
      dispatch(resetStatus());

      const error = useAppSelector(state => state.user.error);

      showError(error);

      handleStatusChange();
    }

    if (
      statusValue === 'success' &&
      sceneValue === 'postItem' &&
      isSameAuthor &&
      !isSamePost
    ) {
      handleStatusChange();
    }

    if (
      statusValue === 'success' &&
      sceneValue === 'postItem' &&
      isSameAuthor &&
      isSamePost
    ) {
      dispatch(resetStatus());

      if (props.isCommentDetail && props.updateListItemCallback) {
        props.updateListItemCallback({isFollowed});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handleFollow = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('postItem'));
    dispatch(setOperationUserId(props.authorId));
    dispatch(setOperationPostId(props.postId));

    const followValue = isFollowed ? 0 : 1;
    setIsFollowed(followValue);
    dispatch(followOrUnfollowUserAsync(followValue));
  }, [dispatch, isFollowed, props.authorId, props.postId]);

  const renderActionButton = useCallback(() => {
    if (props.authorId !== userId) {
      if (isFollowed || conversationId || clientConversationId) {
        return (
          <ChatButton
            conversationId={conversationId}
            clientConversationId={clientConversationId}
            opponentUserId={props.authorId}
            opponentAvatar={props.authorAvatar}
            isFollowed={props.isFollowed}
            isBlocked={props.isBlocked}
          />
        );
      } else {
        return <FollowButton onPress={handleFollow} />;
      }
    }

    return null;
  }, [
    clientConversationId,
    conversationId,
    handleFollow,
    isFollowed,
    props.authorAvatar,
    props.authorId,
    props.isBlocked,
    props.isFollowed,
    userId,
  ]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.authorId,
    });
  }, [navigation, props.authorId, tabBarHeight]);

  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
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
          {props.isFollowing || props.isLatest || props.isCommentDetail
            ? formatTimeAgo(props.createTime as CreateTime)
            : FOR_YOU}
        </Text>
      </View>

      {renderActionButton()}
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
