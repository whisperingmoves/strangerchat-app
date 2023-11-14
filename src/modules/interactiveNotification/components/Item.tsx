import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InteractionNotificationData} from '../../../apis/notification/getInteractionNotifications';
import {generateFullURL, getUsername} from '../../helper';
import {INTERACTION_MAP} from '../../../constants/interactiveNotification/Config';
import {formatTimestamp} from '../../../utils/date';
import HasNewIndicator from '../../../components/HasNewIndicator';
import {
  markInteractionNotificationAsReadAsync,
  ReadStatus,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {setUnreadNotificationsCount} from '../../chat/store/slice';

export type Props = InteractionNotificationData;

export default (props: Props) => {
  const [readStatus, setReadStatus] = useState<ReadStatus>(0);

  useEffect(() => {
    setReadStatus(props.readStatus || 0);
  }, [props.readStatus]);

  const dispatch = useAppDispatch();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const handlePress = useCallback(() => {
    if (readStatus === 1) {
      return;
    }

    dispatch(setScene('markInteractionNotificationAsRead'));

    dispatch(markInteractionNotificationAsReadAsync(props.notificationId));

    setReadStatus(1);
  }, [dispatch, props.notificationId, readStatus]);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'markInteractionNotificationAsRead'
    ) {
      dispatch(resetStatus());

      const unreadNotificationsCount =
        store.getState().chat.unreadNotificationsCount - 1;

      dispatch(
        setUnreadNotificationsCount({
          count: unreadNotificationsCount < 0 ? 0 : unreadNotificationsCount,
        }),
      );

      return;
    }

    if (
      statusValue === 'failed' &&
      sceneValue === 'markInteractionNotificationAsRead'
    ) {
      dispatch(resetStatus());

      setReadStatus(0);

      const {error} = store.getState().interactiveNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.7}
      onPress={handlePress}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={{uri: generateFullURL(props.userAvatar)}}
          style={styles.avatar}
        />
        {readStatus !== 1 && <HasNewIndicator style={styles.indicator} />}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.usernameTxt}>
          {props.username ? props.username : getUsername(props.userId)}
        </Text>

        <Text style={styles.interactionTxt}>
          {INTERACTION_MAP[props.interactionType]}
        </Text>

        <Text style={styles.interactionTimeTxt}>
          {formatTimestamp(props.interactionTime)}
        </Text>
      </View>

      {props.postImage && (
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{uri: generateFullURL(props.postImage)}}
            style={styles.postImage}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  info: {
    flex: 1,
  },
  usernameTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 6,
  },
  interactionTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 6,
    marginBottom: 12,
  },
  interactionTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginLeft: -2,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
