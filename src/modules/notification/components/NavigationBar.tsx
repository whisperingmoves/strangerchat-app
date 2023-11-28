import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import TabBar from './TabBar';
import InteractiveNotification from '../../interactiveNotification/InteractiveNotification';
import {
  INTERACTIVE,
  STATUS,
  SYSTEM,
} from '../../../constants/notification/Config';
import StatusNotification from '../../statusNotification/StatusNotification';
import GiftNotification from '../../giftNotification/GiftNotification';
import {GIFT} from '../../../constants/Config';
import SystemNotification from '../../systemNotification/SystemNotification';

const Tab = createMaterialTopTabNavigator();

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (styleProps: Props) => {
  return (
    // eslint-disable-next-line prettier/prettier,react/no-unstable-nested-components
    <Tab.Navigator style={styleProps.style} tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Interactive"
        component={InteractiveNotification}
        options={{title: INTERACTIVE}}
      />

      <Tab.Screen
        name="Status"
        component={StatusNotification}
        options={{title: STATUS}}
      />

      <Tab.Screen
        name="Gift"
        component={GiftNotification}
        options={{title: GIFT}}
      />

      <Tab.Screen
        name="System"
        component={SystemNotification}
        options={{title: SYSTEM}}
      />
    </Tab.Navigator>
  );
};
