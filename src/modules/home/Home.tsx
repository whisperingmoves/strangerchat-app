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
import {
  inCreConversationUnreadCount,
  setConversation,
  setConversationDetails,
  setCreatedConversation,
  setRecentConversations,
  setUnreadNotificationsCount,
} from '../chat/store/slice';
import {
  markedAsReadMessage,
  setRecentMessages,
  setSentMessage,
} from '../chatDetail/store/slice';
import {UnreadNotificationsCount} from '../../apis/notification/unreadNotificationsCount';
import {CreatedConversation} from '../../apis/notification/createdConversation';
import {RecentConversation} from '../../apis/notification/recentConversations';
import {ConversationDetails} from '../../apis/notification/conversationDetails';
import {RecentMessage} from '../../apis/notification/recentMessages';
import {SentMessage} from '../../apis/notification/sentMessage';
import {MarkedAsReadMessage} from '../../apis/notification/markedAsReadMessage';
import {NearestUsers} from '../../apis/notification/nearestUsers';
import {OnlineUsers} from '../../apis/notification/onlineUsers';
import {store} from '../../stores/store';

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
