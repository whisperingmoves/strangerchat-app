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
