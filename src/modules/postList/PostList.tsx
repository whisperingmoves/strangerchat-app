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

import React, {useEffect} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from '../postItem/PostItem';

import Separator from './components/Separator';
import Footer from '../../components/ListFooter';
import {resetPostDetail} from '../commentDetail/store/slice';
import {useAppDispatch} from '../../hooks';
import {
  TabBarHeight,
  TabBarHeightContext,
} from '../../contexts/TabBarHeightContext';

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.postId}-${index}`;

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

type Props = {
  data: ItemProps[];
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  showCollect?: boolean;
  refreshing: boolean;
  refresh: () => void;
  load: () => void;
  tabBarHeight: TabBarHeight;
};

export default (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPostDetail());
  }, [dispatch]);

  return (
    <TabBarHeightContext.Provider value={props.tabBarHeight}>
      <FlatList
        style={styles.root}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        refreshing={props.refreshing}
        onRefresh={props.refresh}
        onEndReachedThreshold={0.1}
        onEndReached={props.load}
        bounces={bounces}
        ListFooterComponent={<Footer tabBarHeight={props.tabBarHeight} />}
      />
    </TabBarHeightContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
});

const bounces = Platform.OS === 'ios';
