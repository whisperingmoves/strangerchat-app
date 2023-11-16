import React, {useCallback, useEffect, useRef} from 'react';

import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';

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
import {
  avatar,
  blockOrUnblockUserAsync,
  followOrUnfollowUserAsync,
  reportUserAsync,
  resetStatus as resetUserStatus,
  scene as userScene,
  setOperationUserId,
  setScene,
  status as userStatus,
} from '../../stores/user/slice';
import {
  resetCurrentConversationId,
  setCurrentConversationId,
} from './store/slice';
import {StackNavigationProp} from '@react-navigation/stack';
import {InputRef} from '../../components/Input';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {
  BLOCK,
  BLOCK_SUCCESSFULLY,
  CANCEL,
  FOLLOW,
  FOLLOW_SUCCESSFULLY,
  REPORT,
  REPORT_SUCCESSFULLY,
  UNBLOCK,
  UNBLOCK_SUCCESSFULLY,
  UNFOLLOW,
  UNFOLLOW_SUCCESSFULLY,
} from '../../constants/Config';
import {showError, showSuccess} from '../../utils/notification';
import {store} from '../../stores/store';
import {IsBlocked, IsFollowed} from '../recommend/store/slice';
import {getUsername} from '../helper';
import {
  TabBarHeight,
  TabBarHeightContext,
} from '../../contexts/TabBarHeightContext';

type Props = {
  route: Route<
    string,
    {
      tabBarHeight: TabBarHeight;
      conversationId?: ConversationId;
      clientConversationId?: ConversationId;
    }
  >;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const inputRef = useRef<InputRef>(null);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const conversationListValue = useAppSelector(conversationList);

  const dispatch = useAppDispatch();

  const {tabBarHeight, conversationId, clientConversationId} =
    props.route.params;

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

  const userStatusValue = useAppSelector(userStatus);

  const userSceneValue = useAppSelector(userScene);

  useEffect(() => {
    if (
      userStatusValue === 'success' &&
      (userSceneValue === 'followUserOnChatDetail' ||
        userSceneValue === 'unfollowUserOnChatDetail' ||
        userSceneValue === 'blockUserOnChatDetail' ||
        userSceneValue === 'unblockUserOnChatDetail' ||
        userSceneValue === 'reportUserOnChatDetail')
    ) {
      dispatch(resetUserStatus());

      let successMsg = '';

      let isFollowed: IsFollowed | undefined = conversation.isFollowed;

      if (userSceneValue === 'followUserOnChatDetail') {
        isFollowed = 1;

        successMsg = FOLLOW_SUCCESSFULLY;
      } else if (userSceneValue === 'unfollowUserOnChatDetail') {
        isFollowed = 0;

        successMsg = UNFOLLOW_SUCCESSFULLY;
      }

      let isBlocked: IsBlocked | undefined = conversation.isBlocked;

      if (userSceneValue === 'blockUserOnChatDetail') {
        isBlocked = 1;

        successMsg = BLOCK_SUCCESSFULLY;
      } else if (userSceneValue === 'unblockUserOnChatDetail') {
        isBlocked = 0;

        successMsg = UNBLOCK_SUCCESSFULLY;
      } else if (userSceneValue === 'reportUserOnChatDetail') {
        successMsg = REPORT_SUCCESSFULLY;
      }

      dispatch(
        setConversation({
          clientConversationId: conversation.clientConversationId,
          conversationId: conversation.conversationId,
          isFollowed,
          isBlocked,
        }),
      );

      showSuccess(successMsg);

      return;
    }

    if (
      userStatusValue === 'failed' &&
      (userSceneValue === 'followUserOnChatDetail' ||
        userSceneValue === 'unfollowUserOnChatDetail' ||
        userSceneValue === 'blockUserOnChatDetail' ||
        userSceneValue === 'unblockUserOnChatDetail' ||
        userSceneValue === 'reportUserOnChatDetail')
    ) {
      dispatch(resetUserStatus());

      showError(store.getState().user.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStatusValue]);

  const blurInput = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const handleBackPress = useCallback(() => {
    blurInput();

    setTimeout(() => {
      navigation.goBack();

      dispatch(resetCurrentConversationId());
    }, 200);
  }, [blurInput, dispatch, navigation]);

  const {showActionSheetWithOptions} = useActionSheet();

  const handleMorePress = useCallback(() => {
    const options = [
      conversation.isFollowed ? UNFOLLOW : FOLLOW,
      conversation.isBlocked ? UNBLOCK : BLOCK,
      REPORT,
      CANCEL,
    ];

    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        textStyle: {
          textAlign: 'center',
          textAlignVertical: 'center',
          width: '100%',
        },
      },
      async selectedIndex => {
        switch (selectedIndex) {
          case 0:
            dispatch(
              setScene(
                conversation.isFollowed
                  ? 'unfollowUserOnChatDetail'
                  : 'followUserOnChatDetail',
              ),
            );

            dispatch(setOperationUserId(conversation.opponentUserId));

            dispatch(
              followOrUnfollowUserAsync(conversation.isFollowed ? 0 : 1),
            );

            break;
          case 1:
            dispatch(
              setScene(
                conversation.isBlocked
                  ? 'unblockUserOnChatDetail'
                  : 'blockUserOnChatDetail',
              ),
            );

            dispatch(setOperationUserId(conversation.opponentUserId));

            dispatch(blockOrUnblockUserAsync(conversation.isBlocked ? 0 : 1));

            break;
          case 2:
            dispatch(setScene('reportUserOnChatDetail'));

            dispatch(reportUserAsync(conversation.opponentUserId));

            break;
        }
      },
    );
  }, [
    conversation.isBlocked,
    conversation.isFollowed,
    conversation.opponentUserId,
    dispatch,
    showActionSheetWithOptions,
  ]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TabBarHeightContext.Provider value={tabBarHeight}>
        <View style={[styles.root, statusBarStyle]}>
          <DetailHeader
            title={
              conversation.opponentUsername
                ? conversation.opponentUsername
                : getUsername(conversation.opponentUserId)
            }
            style={styles.header}
            onBackPress={handleBackPress}
            onMorePress={handleMorePress}
          />

          <Info
            tag={'Same hobby'}
            percentage={'93%'}
            userAvatar={avatarValue}
            opponentAvatar={conversation.opponentAvatar}
            opponentUserId={conversation.opponentUserId}
          />

          <List
            opponentAvatar={conversation.opponentAvatar}
            conversationId={conversation.conversationId}
            clientConversationId={conversation.clientConversationId}
            style={styles.list}
            inputRef={inputRef}
          />

          <Footer
            style={styles.footer}
            conversationId={conversation.conversationId}
            clientConversationId={conversation.clientConversationId}
            opponentUserId={conversation.opponentUserId}
            ref={inputRef}
            blurInput={blurInput}
          />
        </View>
      </TabBarHeightContext.Provider>
    </KeyboardAvoidingView>
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
