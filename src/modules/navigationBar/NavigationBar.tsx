import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../home/Home';
import Explore from '../explore/Explore';
import Chat from '../chat/Chat';
import Profile from '../profile/Profile';
import {EXPLORE, POST, PROFILE} from '../../constants/navigationBar/Config';
import TabBar from './components/TabBar';
import Empty from '../../components/Empty';
import DailyAttendance, {
  DailyAttendanceRef,
} from './components/DailyAttendance';
import {CHAT, HOME} from '../../constants/Config';
import {isTimestampToday} from '../../utils/date';
import {store} from '../../stores/store';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {socket} from '../../apis/socket';
import {setNearestUsers, setOnlineUsers} from '../home/store/slice';
import {NearestUsers} from '../../apis/notification/nearestUsers';
import {OnlineUsers} from '../../apis/notification/onlineUsers';
import {
  conversationList,
  getRecentChatConversationsAsync,
  inCreConversationUnreadCount,
  setConversation,
  setConversationDetails,
  setCreatedConversation,
  setRecentConversations,
  setUnreadNotificationsCount,
} from '../chat/store/slice';
import {UnreadNotificationsCount} from '../../apis/notification/unreadNotificationsCount';
import {CreatedConversation} from '../../apis/notification/createdConversation';
import {RecentConversation} from '../../apis/notification/recentConversations';
import {ConversationDetails} from '../../apis/notification/conversationDetails';
import {
  markedAsReadMessage,
  setRecentMessages,
  setSentMessage,
  updateMessageConversationId,
} from '../chatDetail/store/slice';
import {RecentMessage} from '../../apis/notification/recentMessages';
import {SentMessage} from '../../apis/notification/sentMessage';
import {MarkedAsReadMessage} from '../../apis/notification/markedAsReadMessage';

export type RootBottomTabParamList = {
  Home: undefined;
  Explore: {tabBarHeight: number};
  Post: undefined;
  Chat: {tabBarHeight: number};
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('notifications', data => {
      const {type, data: messageData} = data;

      switch (type) {
        case 0:
          dispatch(setNearestUsers(messageData as NearestUsers));
          break;
        case 1:
          dispatch(setOnlineUsers(messageData as OnlineUsers));
          break;
        case 2:
          dispatch(
            setUnreadNotificationsCount(
              messageData as UnreadNotificationsCount,
            ),
          );
          break;
        case 3:
          dispatch(setCreatedConversation(messageData as CreatedConversation));

          if (!messageData.clientConversationId) {
            return;
          }

          dispatch(
            updateMessageConversationId({
              clientConversationId: messageData.clientConversationId,
              conversationId: messageData.conversationId,
            }),
          );
          break;
        case 4:
          dispatch(setRecentConversations(messageData as RecentConversation[]));
          break;
        case 5:
          dispatch(setConversationDetails(messageData as ConversationDetails));
          break;
        case 6:
          dispatch(setRecentMessages(messageData as RecentMessage[]));
          break;
        case 7:
          dispatch(setSentMessage(messageData as SentMessage));

          if (messageData.senderId === store.getState().user.userId) {
            return;
          }

          dispatch(
            setConversation({
              conversationId: messageData.conversationId,
              lastMessageTime: messageData.sentTime,
              lastMessageContent: messageData.content,
            }),
          );

          if (
            messageData.conversationId ===
            store.getState().chatDetail.currentConversationId
          ) {
            return;
          }

          dispatch(
            inCreConversationUnreadCount({
              clientConversationId: messageData.clientConversationId,
              conversationId: messageData.conversationId,
              unreadCount: 1,
            }),
          );
          break;
        case 8:
          dispatch(markedAsReadMessage(messageData as MarkedAsReadMessage));
          break;
        default:
          break;
      }
    });

    return () => {
      socket.off('notifications');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const conversationListValue = useAppSelector(conversationList);

  useEffect(() => {
    dispatch(
      getRecentChatConversationsAsync({
        timestamp: conversationListValue.length
          ? conversationListValue.filter(
              conversation =>
                conversation.lastMessageTime && conversation.lastMessageContent,
            )[0].lastMessageTime
          : undefined,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});
