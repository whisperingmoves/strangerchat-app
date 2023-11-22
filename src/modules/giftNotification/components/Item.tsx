import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimestamp} from '../../../utils/date';
import HasNewIndicator from '../../../components/HasNewIndicator';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {
  markGiftNotificationAsReadAsync,
  ReadStatus,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {GiftNotificationData} from '../../../apis/notification/getGiftNotifications';
import {GIFT_TEMPLATE} from '../../../constants/giftNotification/Config';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export type Props = GiftNotificationData;

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

    dispatch(setScene('markGiftNotificationAsRead'));

    dispatch(markGiftNotificationAsReadAsync(props.notificationId));

    setReadStatus(1);
  }, [dispatch, props.notificationId, readStatus]);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'markGiftNotificationAsRead'
    ) {
      dispatch(resetStatus());

      return;
    }

    if (
      statusValue === 'failed' &&
      sceneValue === 'markGiftNotificationAsRead'
    ) {
      dispatch(resetStatus());

      setReadStatus(0);

      const {error} = store.getState().giftNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const userAvatarUri = useMemo(
    () => generateFullURL(props.userAvatar),
    [props.userAvatar],
  );

  const usernameTxt = useMemo(
    () => (props.username ? props.username : getUsername(props.userId)),
    [props.userId, props.username],
  );

  const giftTxt = useMemo(
    () => GIFT_TEMPLATE(usernameTxt, props.giftQuantity, props.giftName),
    [props.giftName, props.giftQuantity, usernameTxt],
  );

  const giftTimeTxt = useMemo(
    () => formatTimestamp(props.giftTime),
    [props.giftTime],
  );

  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handleAvatarPress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.userId,
    });
  }, [navigation, props.userId, tabBarHeight]);

  return (
    <TouchableOpacity
      style={styles.root}
      activeOpacity={0.7}
      onPress={handlePress}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleAvatarPress}>
        <Image source={{uri: userAvatarUri}} style={styles.avatar} />

        {readStatus !== 1 && <HasNewIndicator style={styles.indicator} />}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.usernameTxt}>{usernameTxt}</Text>

        <Text style={styles.giftTxt}>{giftTxt}</Text>

        <Text style={styles.giftTimeTxt}>{giftTimeTxt}</Text>
      </View>
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
  giftTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 6,
    marginBottom: 12,
  },
  giftTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginLeft: -2,
  },
});
