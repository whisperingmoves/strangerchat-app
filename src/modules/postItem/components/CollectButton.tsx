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
import {Image, LayoutAnimation, TouchableOpacity} from 'react-native';

import icon_collect_filled from '../../../assets/images/icons/icon_collect_filled.png';
import icon_collect from '../../../assets/images/icons/icon_collect.png';
import {
  collectOrUnCollectPostAsync,
  IsCollected,
  PostId,
  resetStatus,
  scene,
  setScene,
  status,
} from '../../commentDetail/store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError} from '../../../utils/notification';
import {store} from '../../../stores/store';

type Props = {
  postId: PostId;
  isCollected?: IsCollected;
};

export default (props: Props) => {
  const [isCollected, setIsCollected] = useState<IsCollected>(0);

  useEffect(() => {
    setIsCollected(props.isCollected ? props.isCollected : 0);
  }, [props.isCollected]);

  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'collectOrUnCollectPost') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'collectOrUnCollectPost') {
      dispatch(resetStatus());

      showError(store.getState().commentDetail.error);

      LayoutAnimation.easeInEaseOut();

      if (isCollected) {
        setIsCollected(0);
      } else {
        setIsCollected(1);
      }

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = useCallback(() => {
    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('collectOrUnCollectPost'));

    if (isCollected) {
      setIsCollected(0);

      dispatch(
        collectOrUnCollectPostAsync({postId: props.postId, operation: 0}),
      );
    } else {
      setIsCollected(1);

      dispatch(
        collectOrUnCollectPostAsync({postId: props.postId, operation: 1}),
      );
    }
  }, [dispatch, isCollected, props.postId]);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <Image source={isCollected ? icon_collect_filled : icon_collect} />
    </TouchableOpacity>
  );
};
