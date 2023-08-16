import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import Online from './components/Online';
import OnlineTxt from './components/OnlineTxt';
import NewStories from './components/NewStories';
import {SocketContext} from '../../contexts/SocketContext';
import {useAppDispatch} from '../../hooks';
import {setNearestUsers, setOnlineUsers} from './store/slice';
import {NearestUsersResponse} from '../../apis/notification/nearestUsers';
import {OnlineUsersResponse} from '../../apis/notification/onlineUsers';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const socket = useContext(SocketContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket?.on('notifications', data => {
      const {type, data: messageData} = data;

      switch (type) {
        case 0:
          dispatch(setNearestUsers(messageData as NearestUsersResponse));
          break;
        case 1:
          dispatch(setOnlineUsers(messageData as OnlineUsersResponse));
          break;
        default:
          break;
      }
    });

    return () => {
      socket?.off('notifications');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <LinearGradient colors={['#D988FF', '#8B5CFF']} style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={statusBarStyle}
        bounces={false}>
        <Online />

        <OnlineTxt style={styles.onlineTxt} />

        <NewStories style={styles.newStories} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  onlineTxt: {
    marginTop: 30,
  },
  newStories: {
    marginTop: 38,
  },
});
