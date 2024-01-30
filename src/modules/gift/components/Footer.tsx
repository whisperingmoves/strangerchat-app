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

import TopUp from './TopUp';
import Send from './Send';
import {HandleSend} from '../store/slice';

type Props = {
  handleTopUpPress: () => void;
  handleSend: HandleSend;
  hide: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <TopUp onPress={props.handleTopUpPress} />

      <Send handleSend={props.handleSend} hide={props.hide} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
