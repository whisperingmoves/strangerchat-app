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
import {Image, StyleSheet, Text, View} from 'react-native';

import icon_no_notification_found from '../assets/images/icons/icon_no_notification_found.png';
import {
  NO_NOTIFICATION_FOUND,
  WE_DID_NOT_FOUND_ANY_NOTIFICATION,
} from '../constants/notification/Config';

export default () => {
  return (
    <View style={styles.root}>
      <Image source={icon_no_notification_found} />

      <Text style={styles.titleTxt}>{NO_NOTIFICATION_FOUND}</Text>

      <Text style={styles.descTxt}>{WE_DID_NOT_FOUND_ANY_NOTIFICATION}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: 32,
    marginBottom: 16,
  },
  descTxt: {
    color: '#C7C4CC',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
