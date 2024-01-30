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

import React, {forwardRef, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Input from '../../../components/Input';
import {ENTER_COMMENT} from '../../../constants/commentDetail/Config';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  CommentCount,
  CommentId,
  commentParentId,
  commentParentUserId,
  commentParentUsername,
  commentPlaceHolder,
  commentPostAsync,
  Content,
  postCommentContent,
  postCommentId,
  PostId,
  prependListItem,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {showError} from '../../../utils/notification';
import {store} from '../../../stores/store';
import {getCurrentUnixTimestampInSeconds} from '../../../utils/date';
import {UpdateListItemCallback} from '../../recommend/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  postId: PostId;
  commentCount?: CommentCount;
  updateListItemCallback: UpdateListItemCallback;
};

export default forwardRef((props: Props, ref) => {
  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const postCommentIdValue = useAppSelector(postCommentId);

  const postCommentContentValue = useAppSelector(postCommentContent);

  const commentPlaceHolderValue = useAppSelector(commentPlaceHolder);

  const commentParentIdValue = useAppSelector(commentParentId);

  const commentParentUserIdValue = useAppSelector(commentParentUserId);

  const commentParentUsernameValue = useAppSelector(commentParentUsername);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'commentPost') {
      dispatch(resetStatus());

      dispatch(
        prependListItem({
          avatar: store.getState().user.avatar,
          username: store.getState().user.username,
          createTime: getCurrentUnixTimestampInSeconds(),
          content: postCommentContentValue as Content,
          userId: store.getState().user.userId,
          commentId: postCommentIdValue as CommentId,
          replyUserId: commentParentUserIdValue,
          replyUsername: commentParentUsernameValue,
        }),
      );

      props.updateListItemCallback({
        commentCount: props.commentCount ? props.commentCount + 1 : 1,
      });

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'commentPost') {
      dispatch(resetStatus());

      showError(store.getState().commentDetail.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handleSend = useCallback(
    (value: string) => {
      dispatch(setScene('commentPost'));

      dispatch(
        commentPostAsync({
          postId: props.postId,
          content: value,
          parentId: commentParentIdValue ? commentParentIdValue : undefined,
        }),
      );
    },
    [commentParentIdValue, dispatch, props.postId],
  );

  return (
    <View style={[styles.root, props.style]}>
      <Input
        placeholder={
          commentPlaceHolderValue ? commentPlaceHolderValue : ENTER_COMMENT
        }
        onSend={handleSend}
        ref={ref}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopColor: '#F1F0F3',
    borderTopWidth: 1,
    backgroundColor: '#FFF',
  },
});
