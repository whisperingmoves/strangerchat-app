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

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/modules/login/Login';
import VerificationCode from './src/modules/verificationCode/VerificationCode';
import Gender from './src/modules/gender/Gender';
import Birthday from './src/modules/birthday/Birthday';
import Avatar from './src/modules/avatar/Avatar';
import {
  Mobile,
  resetStatus as resetLoginStatus,
} from './src/modules/login/store/slice';
import {Gender as GenderType} from './src/modules/gender/store/slice';
import {Birthday as BirthdayType} from './src/modules/birthday/store/slice';
import Splash from './src/modules/splash/Splash';
import NavigationBar from './src/modules/navigationBar/NavigationBar';
import NewPost from './src/modules/newPost/NewPost';
import Loading from './src/components/Loading';
import useLoading from './src/hooks/useLoading';
import Search from './src/modules/search/Search';
import ChatDetail from './src/modules/chatDetail/ChatDetail';
import {ConversationId} from './src/modules/chat/store/slice';
import CommentDetail from './src/modules/commentDetail/CommentDetail';
import {
  AuthorId,
  AuthorName,
  PostId,
  resetStatus as resetCommentDetailStatus,
} from './src/modules/commentDetail/store/slice';
import Setting from './src/modules/setting/Setting';
import Wallet from './src/modules/wallet/Wallet';
import MyGift from './src/modules/myGift/MyGift';
import MyFollowing from './src/modules/myFollowing/MyFollowing';
import Notification from './src/modules/notification/Notification';
import Profile from './src/modules/profile/Profile';
import {
  resetStatus as resetProfileStatus,
  UserId,
} from './src/modules/profile/store/slice';
import {TabBarHeight} from './src/contexts/TabBarHeightContext';
import {resetStatus as resetVerificationCodeStatus} from './src/modules/verificationCode/store/slice';
import {resetStatus as resetAvatarStatus} from './src/modules/avatar/store/slice';
import {resetStatus as resetUserStatus} from './src/stores/user/slice';
import {resetStatus as resetNavigationBarStatus} from './src/modules/navigationBar/store/slice';
import {resetStatus as resetHomeStatus} from './src/modules/home/store/slice';
import {resetStatus as resetNewPostStatus} from './src/modules/newPost/store/slice';
import {resetStatus as resetTopUpStatus} from './src/modules/topUp/store/slice';
import {resetStatus as resetChatDetailStatus} from './src/modules/chatDetail/store/slice';
import {resetStatus as resetGiftStatus} from './src/modules/gift/store/slice';
import {resetStatus as resetMyGiftStatus} from './src/modules/myGift/store/slice';
import {useAppDispatch} from './src/hooks';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  VerificationCode: {mobile: Mobile};
  Gender: {mobile: Mobile};
  Birthday: {gender: GenderType; mobile: Mobile};
  Avatar: {gender: GenderType; mobile: Mobile; birthday: BirthdayType};
  NavigationBar: undefined;
  NewPost: undefined;
  Search: {tabBarHeight: TabBarHeight};
  ChatDetail: {
    tabBarHeight: TabBarHeight;
    conversationId: ConversationId;
    clientConversationId?: ConversationId;
  };
  CommentDetail: {
    tabBarHeight: TabBarHeight;
    postId: PostId;
    authorId: AuthorId;
    authorName?: AuthorName;
  };
  Setting: undefined;
  Wallet: undefined;
  MyGift: {tabBarHeight: TabBarHeight};
  MyFollowing: {tabBarHeight: TabBarHeight};
  Notification: {tabBarHeight: TabBarHeight};
  Profile: {tabBarHeight: TabBarHeight; userId?: UserId};
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): Element {
  const loading = useLoading();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLoginStatus());
    dispatch(resetVerificationCodeStatus());
    dispatch(resetAvatarStatus());
    dispatch(resetUserStatus());
    dispatch(resetNavigationBarStatus());
    dispatch(resetHomeStatus());
    dispatch(resetNewPostStatus());
    dispatch(resetProfileStatus());
    dispatch(resetCommentDetailStatus());
    dispatch(resetTopUpStatus());
    dispatch(resetChatDetailStatus());
    dispatch(resetGiftStatus());
    dispatch(resetMyGiftStatus());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Loading visible={loading} />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            cardStyle: {elevation: 1},
          }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalPresentationIOS,
            }}
          />

          <Stack.Screen
            name="VerificationCode"
            component={VerificationCode}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Gender"
            component={Gender}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Birthday"
            component={Birthday}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Avatar"
            component={Avatar}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="NavigationBar"
            component={NavigationBar}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />

          <Stack.Screen
            name="NewPost"
            component={NewPost}
            options={{
              headerShown: false,
              ...TransitionPresets.ModalSlideFromBottomIOS,
            }}
          />

          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="ChatDetail"
            component={ChatDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="CommentDetail"
            component={CommentDetail}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Wallet"
            component={Wallet}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="MyGift"
            component={MyGift}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="MyFollowing"
            component={MyFollowing}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
