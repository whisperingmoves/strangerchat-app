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
