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
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateFullURL, getUsername} from '../../helper';
import {formatTimestamp} from '../../../utils/date';
import HasNewIndicator from '../../../components/HasNewIndicator';
import {
  markStatusNotificationAsReadAsync,
  ReadStatus,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';
import {StatusNotificationData} from '../../../apis/notification/getStatusNotifications';
import {STATUS_MAP} from '../../../constants/statusNotification/Config';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

export type Props = StatusNotificationData;

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

    dispatch(setScene('markStatusNotificationAsRead'));

    dispatch(markStatusNotificationAsReadAsync(props.notificationId));

    setReadStatus(1);
  }, [dispatch, props.notificationId, readStatus]);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'markStatusNotificationAsRead'
    ) {
      dispatch(resetStatus());

      return;
    }

    if (
      statusValue === 'failed' &&
      sceneValue === 'markStatusNotificationAsRead'
    ) {
      dispatch(resetStatus());

      setReadStatus(0);

      const {error} = store.getState().statusNotification;

      showError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

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

        <Text style={styles.statusTxt}>{STATUS_MAP[props.statusType]}</Text>

        <Text style={styles.statusTimeTxt}>
          {formatTimestamp(props.statusTime)}
        </Text>
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
  statusTxt: {
    color: '#C7C4CC',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 6,
    marginBottom: 12,
  },
  statusTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginLeft: -2,
  },
});
