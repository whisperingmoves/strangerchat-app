import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_next from '../../../assets/images/icons/icon_next.png';
import icon_dialog_outlined from '../../../assets/images/icons/icon_dialog_outlined.png';
import Avatar from './Avatar';
import {VIEW_DETAILS} from '../../../constants/notification/Config';
import {SystemNotificationData} from '../../../apis/notification/getSystemNotifications';
import {
  markSystemNotificationAsReadAsync,
  ReadStatus,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {formatTimestamp} from '../../../utils/date';
import {setUnreadNotificationsCount} from '../../chat/store/slice';

export type Props = SystemNotificationData;

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

    dispatch(setScene('markSystemNotificationAsRead'));

    dispatch(markSystemNotificationAsReadAsync(props.notificationId));

    setReadStatus(1);
  }, [dispatch, props.notificationId, readStatus]);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'markSystemNotificationAsRead'
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
      sceneValue === 'markSystemNotificationAsRead'
    ) {
      dispatch(resetStatus());

      setReadStatus(0);

      const {error} = store.getState().systemNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const notificationTimeTxt = useMemo(
    () => formatTimestamp(props.notificationTime),
    [props.notificationTime],
  );

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.7}
      onPress={handlePress}>
      <Avatar
        notificationType={props.notificationType}
        readStatus={readStatus}
      />

      <ImageBackground
        source={icon_dialog_outlined}
        style={styles.container}
        imageStyle={styles.containerIcon}>
        <Text style={styles.titleTxt}>{props.notificationTitle}</Text>

        <Text style={styles.notificationTimeTxt}>{notificationTimeTxt}</Text>

        <Text style={styles.notificationContentTxt}>
          {props.notificationContent}
        </Text>

        {props.notificationType === 0 && <View style={styles.line} />}

        {props.notificationType === 0 && (
          <TouchableOpacity activeOpacity={0.7} style={styles.viewContainer}>
            <Text style={styles.viewTxt}>{VIEW_DETAILS}</Text>

            <Image source={icon_next} style={styles.viewIcon} />
          </TouchableOpacity>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    gap: 6,
  },
  container: {
    flex: 1,
  },
  containerIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 14,
    marginHorizontal: 22,
  },
  notificationTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 10,
    marginHorizontal: 22,
  },
  notificationContentTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 22,
  },
  line: {
    height: 0,
    borderWidth: 1,
    borderColor: '#F1F0F3',
    marginTop: -2,
    marginHorizontal: 22,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 16,
    marginHorizontal: 22,
  },
  viewTxt: {
    color: '#8B5CFF',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  viewIcon: {
    tintColor: '#8B5CFF',
  },
});
