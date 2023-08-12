import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Login from './src/modules/login/Login';
import VerificationCode from './src/modules/verificationCode/VerificationCode';
import Gender from './src/modules/gender/Gender';
import Birthday from './src/modules/birthday/Birthday';

const Stack = createStackNavigator();

function App(): Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            cardStyle: {elevation: 1},
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
