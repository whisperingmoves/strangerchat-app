import React, {useEffect, useState} from 'react';
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
import {
  IsLiked,
  LikeCount,
  likeOrUnlikePostAsync,
  operationPostId,
  PostId,
  scene,
  setOperationPostId,
  setScene,
  status,
} from '../../following/store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

type Props = {
  style: StyleProp<ViewStyle>;
  postId: PostId;
  count?: LikeCount;
  isLiked?: IsLiked;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState<number>(props.count ? props.count : 0);
  const [isLiked, setIsLiked] = useState<number>(
    props.isLiked ? props.isLiked : 0,
  );
  const statusValue = useAppSelector(status);
  const sceneValue = useAppSelector(scene);
  const operationPostIdValue = useAppSelector(operationPostId);

  useEffect(() => {
    if (
      statusValue === 'failed' &&
      sceneValue === 'likeOrUnlikePost' &&
      operationPostIdValue === props.postId
    ) {
      const error = store.getState().following.error;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = () => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('likeOrUnlikePost'));

    dispatch(setOperationPostId(props.postId));

    if (isLiked) {
      setIsLiked(0);
      setCount(count - 1);

      dispatch(likeOrUnlikePostAsync({postId: props.postId, action: 0}));

      return;
    }

    setIsLiked(1);
    setCount(count + 1);

    dispatch(likeOrUnlikePostAsync({postId: props.postId, action: 1}));
  };

  const showCountTxt = Boolean(count > 0);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={handlePress}>
      <Image source={isLiked ? icon_like_filled : icon_like_outlined} />

      {showCountTxt && (
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
