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

import React, {useCallback, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Following from '../following/Following';
import Recommend from '../recommend/Recommend';
import Latest from '../latest/Latest';
import TabBar from './components/TabBar';
import {FOLLOWING} from '../../constants/Config';
import {LATEST, RECOMMEND} from '../../constants/explore/Config';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import {TabBarHeightContext} from '../../contexts/TabBarHeightContext';

const Tab = createMaterialTopTabNavigator();

export default () => {
  const tabBarHeight = useContext(TabBarHeightContext);

  const following = useCallback(
    () => <Following tabBarHeight={tabBarHeight} />,
    [tabBarHeight],
  );

  const recommend = useCallback(
    () => <Recommend tabBarHeight={tabBarHeight} />,
    [tabBarHeight],
  );

  const latest = useCallback(
    () => <Latest tabBarHeight={tabBarHeight} />,
    [tabBarHeight],
  );

  const tabBar = useCallback(
    (tabBarProps: MaterialTopTabBarProps) => (
      <TabBar {...tabBarProps} tabBarHeight={tabBarHeight} />
    ),
    [tabBarHeight],
  );

  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen
        name="Following"
        component={following}
        options={{
          title: FOLLOWING,
        }}
      />

      <Tab.Screen
        name="Recommend"
        component={recommend}
        options={{
          title: RECOMMEND,
        }}
      />

      <Tab.Screen
        name="Latest"
        component={latest}
        options={{
          title: LATEST,
        }}
      />
    </Tab.Navigator>
  );
};
