import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Share from 'react-native-share';

import icon_share_outlined from '../../../assets/images/icons/icon_share_outlined.png';
import {formatNumberWithSuffix} from '../../../utils/number';
import {ShareCount} from '../../following/store/slice';
import {
  Content,
  operationPostId,
  PostId,
  resetStatus,
  scene,
  setOperationPostId,
  setScene,
  sharePostAsync,
  status,
} from '../../../stores/post/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {UpdateListItemCallback} from '../../recommend/store/slice';
import {ViewShotContext} from '../../../contexts/ViewShotContext';

type Props = {
  style?: StyleProp<ViewStyle>;
  postId: PostId;
  content: Content;
  count?: ShareCount;
  isCommentDetail?: boolean;
  updateListItemCallback?: UpdateListItemCallback;
};

export default (props: Props) => {
  const [count, setCount] = useState<ShareCount>(0);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const operationPostIdValue = useAppSelector(operationPostId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCount(props.count ? props.count : 0);
  }, [props.count]);

  useEffect(() => {
    if (
      statusValue === 'failed' &&
      sceneValue === 'share' &&
      operationPostIdValue === props.postId
    ) {
      dispatch(resetStatus());

      const error = store.getState().post.error;

      showError(error);

      LayoutAnimation.easeInEaseOut();

      setCount(count - 1);
    }

    if (
      statusValue === 'success' &&
      sceneValue === 'share' &&
      operationPostIdValue === props.postId
    ) {
      dispatch(resetStatus());

      if (props.isCommentDetail && props.updateListItemCallback) {
        props.updateListItemCallback({shareCount: count});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const viewShotRef = useContext(ViewShotContext);

  const handlePress = useCallback(() => {
    // @ts-ignore
    viewShotRef.current
      ?.capture()
      .then((uri: string) => {
        Share.open({url: uri}).then();

        LayoutAnimation.easeInEaseOut();

        dispatch(setOperationPostId(props.postId));

        dispatch(setScene('share'));

        setCount(count + 1);

        dispatch(sharePostAsync());
      })
      .catch();
  }, [count, dispatch, props.postId, viewShotRef]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={handlePress}>
      <Image source={icon_share_outlined} />

      {count > 0 && (
        <Text style={styles.txt}>{formatNumberWithSuffix(count)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    gap: 5,
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
