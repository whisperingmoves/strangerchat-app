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

import React, {useCallback, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {SETTING} from '../../constants/setting/Config';
import Item from './components/Item';
import DetailHeader from '../../components/DetailHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MENU_LIST} from './helper';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyles: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, statusBarStyles]}>
      <DetailHeader
        style={styles.header}
        hideMore={true}
        onBackPress={handleBackPress}
        title={SETTING}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {MENU_LIST.map((value, index) => {
          return (
            <View key={index}>
              <Item {...value} style={styles.item} />

              {(index === 0 || index === 3 || index === 5 || index === 7) && (
                <View style={styles.line} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0F3',
    paddingVertical: 12,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  item: {
    marginVertical: 18,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1F0F3',
    marginVertical: 8,
  },
});
