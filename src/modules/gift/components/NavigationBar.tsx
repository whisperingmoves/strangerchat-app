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
