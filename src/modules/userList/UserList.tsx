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

import React, {useCallback} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './components/Item';
import ListSeparator from '../../components/ListSeparator';
import Footer from '../../components/ListFooter';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.username}-${index}`;

type Props = {
  data: ItemProps[];
  refreshing: boolean;
  refresh: () => void;
  load: () => void;
  tabBarHeight: number;
};

export default (props: Props) => {
  const renderSeparator = useCallback(() => {
    return <ListSeparator style={styles.separator} />;
  }, []);

  return (
    <FlatList
      style={styles.root}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<Footer tabBarHeight={props.tabBarHeight} />}
      refreshing={props.refreshing}
      onRefresh={props.refresh}
      onEndReachedThreshold={0.1}
      onEndReached={props.load}
      bounces={bounces}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    marginTop: 28,
  },
  separator: {
    height: 30,
  },
});

const bounces = Platform.OS === 'ios';
