import React from 'react';
import {StatusBar} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/modules/login/Login';
import VerificationCode from './src/modules/verificationCode/VerificationCode';
import Gender from './src/modules/gender/Gender';
import Birthday from './src/modules/birthday/Birthday';
import Avatar from './src/modules/avatar/Avatar';
import {Mobile} from './src/modules/login/store/slice';
import {Gender as GenderType} from './src/modules/gender/store/slice';
import {Birthday as BirthdayType} from './src/modules/birthday/store/slice';
import Splash from './src/modules/splash/Splash';
import NavigationBar from './src/modules/navigationBar/NavigationBar';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  VerificationCode: {mobile: Mobile};
  Gender: {mobile: Mobile};
  Birthday: {gender: GenderType; mobile: Mobile};
  Avatar: {gender: GenderType; mobile: Mobile; birthday: BirthdayType};
  NavigationBar: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
