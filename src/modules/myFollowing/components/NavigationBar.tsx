import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import TabBar from './TabBar';
import FollowingUser from '../../followingUser/FollowingUser';
import Follower from '../../follower/Follower';
import CloseFriend from '../../closeFriend/CloseFriend';
import {FOLLOW, FOLLOWING} from '../../../constants/Config';
import {CLOSE_FRIEND} from '../../../constants/myFollowing/Config';

const Tab = createMaterialTopTabNavigator();

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (styleProps: Props) => {
  return (
    // eslint-disable-next-line prettier/prettier,react/no-unstable-nested-components
    <Tab.Navigator style={styleProps.style} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="FollowingUser"
        component={FollowingUser}
        options={{title: FOLLOWING}}
      />

      <Tab.Screen
        name="Follower"
        component={Follower}
        options={{title: FOLLOW}}
      />

      <Tab.Screen
        name="CloseFriend"
        component={CloseFriend}
        options={{title: CLOSE_FRIEND}}
      />
    </Tab.Navigator>
  );
};
