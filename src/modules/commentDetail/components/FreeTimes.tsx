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

import React, {useCallback, useEffect} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import icon_fire from '../../../assets/images/icons/icon_fire.png';
import {
  FREE_HEATING_TIMES_HAVE_BEEN_USED_UP,
  FREE_TIMES,
  POST_HEATED_SUCCESSFULLY,
} from '../../../constants/commentDetail/Config';
import {freeHeatsLeft, setUser} from '../../../stores/user/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  heatOrUnHeatPostAsync,
  PostId,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {showError, showSuccess} from '../../../utils/notification';
import {store} from '../../../stores/store';

type Props = {
  postId: PostId;
};

export default (props: Props) => {
  const freeHeatsLeftValue = useAppSelector(freeHeatsLeft);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'heatOrUnHeatPost') {
      dispatch(resetStatus());

      showSuccess(POST_HEATED_SUCCESSFULLY);

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'heatOrUnHeatPost') {
      dispatch(resetStatus());

      showError(store.getState().commentDetail.error);

      LayoutAnimation.easeInEaseOut();

      freeHeatsLeftValue &&
        dispatch(setUser({freeHeatsLeft: freeHeatsLeftValue - 1}));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const handlePress = useCallback(() => {
    if (!freeHeatsLeftValue) {
      showError(FREE_HEATING_TIMES_HAVE_BEEN_USED_UP);

      return;
    }

    LayoutAnimation.easeInEaseOut();

    dispatch(setScene('heatOrUnHeatPost'));

    dispatch(setUser({freeHeatsLeft: freeHeatsLeftValue - 1}));

    dispatch(
      heatOrUnHeatPostAsync({
        postId: props.postId,
        action: 1,
      }),
    );
  }, [dispatch, freeHeatsLeftValue, props.postId]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.root}
      onPress={handlePress}>
      <Image source={icon_fire} />

      <Text style={styles.txt}>{FREE_TIMES(freeHeatsLeftValue || 0)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 2,
    alignItems: 'center',
  },
  txt: {
    color: '#C7C4CC',
    fontSize: 8,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
