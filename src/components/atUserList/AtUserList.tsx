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
import {StyleSheet, View} from 'react-native';
import AtUserItem, {UserId, Username} from './AtUserItem';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type AtUser = {
  userId: UserId;
  username?: Username;
};

type Props = {
  style?: StyleProp<ViewStyle>;
  atUsers: AtUser[];
  onItemPress: (userId: UserId) => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      {props.atUsers.map((atUser, index) => (
        <AtUserItem
          key={`${index}-${atUser.userId}`}
          userId={atUser.userId}
          username={atUser.username}
          onPress={props.onItemPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
