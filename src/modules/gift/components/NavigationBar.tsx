import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TabBar from './TabBar';
import Gift from './List';
import {GIFT} from '../../../constants/Config';

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      {/*<Tab.Screen*/}
      {/*  name="MyPackage"*/}
      {/*  component={Gift}*/}
      {/*  options={{title: MY_PACKAGE}}*/}
      {/*/>*/}

      <Tab.Screen name="Gift" component={Gift} options={{title: GIFT}} />

      {/*<Tab.Screen name="VIP" component={Gift} options={{title: VIP}} />*/}
    </Tab.Navigator>
  );
};
