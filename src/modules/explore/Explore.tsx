import React, {useCallback} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Following from '../following/Following';
import Recommend from '../recommend/Recommend';
import Latest from '../latest/Latest';
import TabBar from './components/TabBar';
import {FOLLOWING} from '../../constants/Config';
import {LATEST, RECOMMEND} from '../../constants/explore/Config';
import {Route} from '@react-navigation/native';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

const Tab = createMaterialTopTabNavigator();

type Props = {
  route: Route<string, {tabBarHeight: number}>;
};

export default (props: Props) => {
  const {tabBarHeight} = props.route.params;

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
