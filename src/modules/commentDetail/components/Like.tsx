import React, {useCallback, useEffect, useState} from 'react';
import {Image, LayoutAnimation, TouchableOpacity} from 'react-native';

import icon_like_outlined from '../../../assets/images/icons/icon_like_outlined.png';
import icon_like_filled from '../../../assets/images/icons/icon_like_filled.png';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  CommentId,
  IsLiked,
  likeOrUnlikeCommentAsync,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

type Props = {
  commentId: CommentId;
  isLiked?: IsLiked;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const [isLiked, setIsLiked] = useState<IsLiked>(0);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    setIsLiked(props.isLiked ? props.isLiked : 0);
  }, [props.isLiked]);

  useEffect(() => {
    if (statusValue === 'failed' && sceneValue === 'likeOrUnlikeComment') {
      dispatch(resetStatus());

      const error = store.getState().commentDetail.error;

      showError(error);

      LayoutAnimation.easeInEaseOut();

      if (isLiked) {
        setIsLiked(0);
      } else {
        setIsLiked(1);
      }

      return;
    }

    if (statusValue === 'success' && sceneValue === 'likeOrUnlikeComment') {
      dispatch(resetStatus());

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('likeOrUnlikeComment'));

    if (isLiked) {
      setIsLiked(0);

      dispatch(
        likeOrUnlikeCommentAsync({commentId: props.commentId, operation: 0}),
      );

      return;
    }

    setIsLiked(1);

    dispatch(
      likeOrUnlikeCommentAsync({commentId: props.commentId, operation: 1}),
    );
  }, [dispatch, isLiked, props.commentId]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Image source={isLiked ? icon_like_filled : icon_like_outlined} />
    </TouchableOpacity>
  );
};
