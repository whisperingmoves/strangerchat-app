import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Following from '../following/Following';
import Recommend from '../recommend/Recommend';
import Latest from '../latest/Latest';
import TabBar from './components/TabBar';
import {FOLLOWING} from '../../constants/Config';
import {LATEST, RECOMMEND} from '../../constants/explore/Config';

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Following"
        component={Following}
        options={{
          title: FOLLOWING,
        }}
      />

      <Tab.Screen
        name="Recommend"
        component={Recommend}
        options={{
          title: RECOMMEND,
        }}
      />

      <Tab.Screen
        name="Latest"
        component={Latest}
        options={{
          title: LATEST,
        }}
      />
    </Tab.Navigator>
  );
};
