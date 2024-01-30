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

import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import Item, {Props as ItemProps} from './Item';
import ListSeparator from '../../../components/ListSeparator';
import Header from './Header';
import ListFooter from '../../../components/ListFooter';
import {
  getPostCommentsAsync,
  list,
  resetCommentParentId,
  resetCommentParentUserId,
  resetCommentParentUsername,
  resetCommentPlaceHolder,
  resetPage,
  resetStatus,
  scene,
  setScene,
  status,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {GetPostResponse} from '../../../apis/post/getPost';
import {UpdateListItemCallback} from '../../recommend/store/slice';
import {store} from '../../../stores/store';
import {showError} from '../../../utils/notification';

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) =>
  `${item.commentId}-${index}`;

const renderSeparator = () => <ListSeparator style={styles.listSeparator} />;

type Props = GetPostResponse & {
  updateListItemCallback?: UpdateListItemCallback;
  showCollect?: boolean;
  focusInput: () => void;
};

export default (props: Props) => {
  const listValue = useAppSelector(list);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(resetPage());

    dispatch(resetCommentParentId());

    dispatch(resetCommentParentUserId());

    dispatch(resetCommentParentUsername());

    dispatch(resetCommentPlaceHolder());

    dispatch(setScene('getPostComments'));

    dispatch(getPostCommentsAsync(props.postId));
  }, [dispatch, props.postId]);

  useEffect(() => {
    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = useCallback(() => {
    if (
      (statusValue === 'loading' || statusValue === 'idle') &&
      sceneValue === 'getPostComments'
    ) {
      return;
    }

    dispatch(setScene('getPostComments'));

    dispatch(getPostCommentsAsync(props.postId));
  }, [dispatch, props.postId, sceneValue, statusValue]);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'getPostComments') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getPostComments') {
      dispatch(resetStatus());

      showError(store.getState().commentDetail.error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  return (
    <FlatList
      style={styles.root}
      data={listValue}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <Header
          {...props}
          isCommentDetail={true}
          updateListItemCallback={props.updateListItemCallback}
          focusInput={props.focusInput}
        />
      }
      ListFooterComponent={<ListFooter tabBarHeight={72 + 30} />}
      refreshing={statusValue === 'loading' && sceneValue === 'getPostComments'}
      onRefresh={refresh}
      onEndReachedThreshold={0.1}
      onEndReached={load}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listSeparator: {
    height: 30,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
