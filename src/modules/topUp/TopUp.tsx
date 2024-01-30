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

import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';

import Handles from './components/Handles';
import Title from './components/Title';
import GoodsList from './components/List';

type Props = {
  style: StyleProp<ViewStyle>;
  handleTopUpDrag: (y: number) => void;
  handleTopUpRelease: (y: number) => void;
  hideTopUp: () => void;
};

export default (props: Props) => {
  const [y, setY] = useState(0);

  const handleLayoutChange = (event: LayoutChangeEvent) => {
    setY(event.nativeEvent.layout.y);
  };

  const handleResponderGrant = (event: GestureResponderEvent) => {
    event.preventDefault();
  };

  const handleResponderMove = (event: GestureResponderEvent) => {
    const {pageY} = event.nativeEvent;
    if (y === 0) {
      return;
    }
    props.handleTopUpDrag(pageY - y);
  };

  const handleResponderRelease = (event: GestureResponderEvent) => {
    const {pageY} = event.nativeEvent;
    if (y === 0) {
      return;
    }
    props.handleTopUpRelease(pageY - y);
  };

  return (
    <View
      style={[styles.root, props.style]}
      onLayout={handleLayoutChange}
      onResponderGrant={handleResponderGrant}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderRelease}
      onStartShouldSetResponder={() => true}>
      <Handles />

      <Title style={styles.title} />

      <GoodsList style={styles.goodsList} hideTopUp={props.hideTopUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '86%',
    paddingHorizontal: 30,
    paddingTop: 10,
    // paddingBottom: 32,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    marginTop: 14,
  },
  goodsList: {
    marginTop: 20,
  },
});
