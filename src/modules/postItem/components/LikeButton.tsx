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

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_like_outlined from '../../../assets/images/icons/icon_like_outlined.png';
import icon_like_filled from '../../../assets/images/icons/icon_like_filled.png';
import {formatNumberWithSuffix} from '../../../utils/number';
import {IsLiked, LikeCount} from '../../following/store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {
  likeOrUnlikePostAsync,
  operationPostId,
  PostId,
  resetStatus,
  scene,
  setOperationPostId,
  setScene,
  status,
} from '../../../stores/post/slice';
import {UpdateListItemCallback} from '../../recommend/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  postId: PostId;
  count?: LikeCount;
  isLiked?: IsLiked;
  isCommentDetail?: boolean;
  updateListItemCallback?: UpdateListItemCallback;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<LikeCount>(0);

  const [isLiked, setIsLiked] = useState<IsLiked>(0);

  const statusValue = useAppSelector(status);

  const operationPostIdValue = useAppSelector(operationPostId);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    setCount(props.count ? props.count : 0);
  }, [props.count]);

  useEffect(() => {
    setIsLiked(props.isLiked ? props.isLiked : 0);
  }, [props.isLiked]);

  useEffect(() => {
    if (
      statusValue === 'failed' &&
      sceneValue === 'like' &&
      operationPostIdValue === props.postId
    ) {
      dispatch(resetStatus());

      const error = store.getState().post.error;

      showError(error);

      LayoutAnimation.easeInEaseOut();

      if (isLiked) {
        setIsLiked(0);
        setCount(count - 1);
      } else {
        setIsLiked(1);
        setCount(count + 1);
      }
    }

    if (
      statusValue === 'success' &&
      sceneValue === 'like' &&
      operationPostIdValue === props.postId
    ) {
      dispatch(resetStatus());

      if (props.isCommentDetail && props.updateListItemCallback) {
        props.updateListItemCallback({isLiked, likeCount: count});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setOperationPostId(props.postId));

    dispatch(setScene('like'));

    if (isLiked) {
      setIsLiked(0);
      setCount(count - 1);

      dispatch(likeOrUnlikePostAsync(0));

      return;
    }

    setIsLiked(1);
    setCount(count + 1);

    dispatch(likeOrUnlikePostAsync(1));
  }, [count, dispatch, isLiked, props.postId]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={handlePress}>
      <Image source={isLiked ? icon_like_filled : icon_like_outlined} />

      {count > 0 && (
        <Text style={styles.txt}>{formatNumberWithSuffix(count)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  txt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
