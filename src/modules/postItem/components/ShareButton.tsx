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
