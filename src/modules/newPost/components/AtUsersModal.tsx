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

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import AtUsersHeader from './AtUsersHeader';
import Search from '../../../components/Search';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  keyword,
  Keyword,
  setAtUsers,
  setKeyword,
  setState,
} from '../store/slice';
import AtUserList from './AtUserList';
import {store} from '../../../stores/store';

export interface AtUsersRef {
  show: () => void;
  hide: () => void;
}

export default forwardRef(({}, ref) => {
  const [visible, setVisible] = useState(false);

  const insets = useSafeAreaInsets();

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {paddingTop: insets.top};
  }, [insets.top]);

  const handleHeaderClose = useCallback(() => {
    hide();
  }, [hide]);

  const dispatch = useAppDispatch();

  const handleHeaderConfirm = useCallback(() => {
    dispatch(
      setState({
        confirmedAtUsers: store.getState().newPost.checkedAtUsers,
      }),
    );

    dispatch(
      setAtUsers(
        store.getState().newPost.checkedAtUsers.map(atUser => atUser.userId),
      ),
    );

    hide();
  }, [dispatch, hide]);

  const handleChangeText = useCallback(
    (text: Keyword) => {
      dispatch(setKeyword(text));
    },
    [dispatch],
  );

  const keywordValue = useAppSelector(keyword);

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType={'slide'}>
      <View style={[styles.root, statusBarStyle]}>
        <AtUsersHeader
          onConfirm={handleHeaderConfirm}
          onClose={handleHeaderClose}
        />

        <Search
          style={styles.search}
          onChangeText={handleChangeText}
          text={keywordValue}
        />

        <AtUserList style={styles.list} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  search: {
    marginTop: 22,
    marginHorizontal: 20,
  },
  list: {
    marginTop: 36,
  },
});
