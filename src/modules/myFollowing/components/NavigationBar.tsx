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
