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
