import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../home/Home';
import Explore from '../explore/Explore';
import Chat from '../chat/Chat';
import Profile from '../profile/Profile';
import {
  EXPLORE,
  HOME,
  POST,
  PROFILE,
} from '../../constants/navigationBar/Config';
import TabBar from './components/TabBar';
import Empty from '../../components/Empty';
import DailyAttendance, {
  DailyAttendanceRef,
} from './components/DailyAttendance';
import {CHAT} from '../../constants/Config';
import {SocketProvider} from '../../contexts/SocketContext';
import {isTimestampToday} from '../../utils/date';
import {store} from '../../stores/store';

const BottomTab = createBottomTabNavigator();

export default () => {
  const dailyAttendanceRef = useRef<DailyAttendanceRef>(null);

  const todayIsCheckedIn = isTimestampToday(
    store.getState().user.lastCheckDate as number,
  );

  useEffect(() => {
    if (todayIsCheckedIn) {
      return;
    }

    setTimeout(() => {
      dailyAttendanceRef.current?.show();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketProvider>
      <View style={styles.root}>
        {/* eslint-disable-next-line react/no-unstable-nested-components */}
        <BottomTab.Navigator tabBar={props => <TabBar {...props} />}>
          <BottomTab.Screen
            name="Home"
            component={Home}
            options={{
              title: HOME,
              headerShown: false,
            }}
          />

          <BottomTab.Screen
            name="Explore"
            component={Explore}
            options={{
              title: EXPLORE,
              headerShown: false,
            }}
          />

          <BottomTab.Screen
            name="Post"
            component={Empty}
            options={{
              title: POST,
              headerShown: false,
            }}
          />

          <BottomTab.Screen
            name="Chat"
            component={Chat}
            options={{
              title: CHAT,
              headerShown: false,
            }}
          />

          <BottomTab.Screen
            name="Profile"
            component={Profile}
            options={{
              title: PROFILE,
              headerShown: false,
            }}
          />
        </BottomTab.Navigator>

        <DailyAttendance ref={dailyAttendanceRef} />
      </View>
    </SocketProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
