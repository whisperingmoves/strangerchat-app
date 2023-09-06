import React, {useEffect} from 'react';

import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Info from './components/Info';
import List from './components/List';
import Footer from './components/Footer';
import {
  ConversationId,
  conversationList,
  setConversation,
} from '../chat/store/slice';
import {Route, useNavigation} from '@react-navigation/native';
import DetailHeader from '../../components/DetailHeader';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {avatar} from '../../stores/user/slice';
import {
  resetCurrentConversationId,
  setCurrentConversationId,
} from './store/slice';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  route: Route<
    string,
    {conversationId?: ConversationId; clientConversationId?: ConversationId}
  >;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const conversationListValue = useAppSelector(conversationList);

  const dispatch = useAppDispatch();

  const {conversationId, clientConversationId} = props.route.params;

  const conversationIndex = conversationListValue.findIndex(item =>
    clientConversationId
      ? item.clientConversationId === clientConversationId
      : item.conversationId === conversationId,
  );

  const conversation = conversationListValue[conversationIndex];

  const avatarValue = useAppSelector(avatar);

  const statusBarStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
  };

  useEffect(() => {
    dispatch(
      setConversation({
        clientConversationId: conversation.clientConversationId,
        conversationId: conversation.conversationId,
        unreadCount: 0,
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setCurrentConversationId(conversation.conversationId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation]);

  const handleBackPress = () => {
    navigation.goBack();

    dispatch(resetCurrentConversationId());
  };

  return (
    <View style={[styles.root, statusBarStyle]}>
      <DetailHeader
        username={conversation.opponentUsername}
        style={styles.header}
        userId={conversation.opponentUserId}
        onPress={handleBackPress}
      />

      <Info
        tag={'Same hobby'}
        percentage={'93%'}
        userAvatar={avatarValue}
        opponentAvatar={conversation.opponentAvatar}
      />

      <List
        opponentAvatar={conversation.opponentAvatar}
        conversationId={conversation.conversationId}
        clientConversationId={conversation.clientConversationId}
        style={styles.list}
      />

      <Footer
        style={styles.footer}
        conversationId={conversation.conversationId}
        clientConversationId={conversation.clientConversationId}
        opponentUserId={conversation.opponentUserId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    marginVertical: 12,
  },
  list: {
    marginTop: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
});
