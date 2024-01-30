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

import React, {useEffect, useRef} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StackNavigationProp} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Header from './components/Header';

import BottomButton from './components/BottomButton';
import Location from './components/Location';
import Visibility from './components/Visibility';
import Input, {InputRef} from './components/Input';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  createPostAsync,
  geoReverseAsync,
  getLocationAsync,
  resetState,
  resetStatus,
  scene,
  setScene,
  status,
  visibility,
} from './store/slice';
import {showError} from '../../utils/notification';
import {store} from '../../stores/store';
import {prependListItem} from '../../stores/user/slice';
import {getCurrentUnixTimestampInSeconds} from '../../utils/date';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const inputRef = useRef<InputRef>(null);

  const insets = useSafeAreaInsets();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const visibilityValue = useAppSelector(visibility);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScene('getLocation'));

    dispatch(getLocationAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePublish = () => {
    dispatch(setScene('newPost'));

    dispatch(createPostAsync());
  };

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'uploadPost') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'uploadPost') {
      dispatch(resetStatus());

      const {error} = store.getState().newPost;

      showError(error);

      return;
    }

    if (statusValue === 'success' && sceneValue === 'newPost') {
      dispatch(resetStatus());

      dispatch(
        prependListItem({
          postId: store.getState().newPost.postId,
          createTime: getCurrentUnixTimestampInSeconds(),
          content: store.getState().newPost.content,
          images: store.getState().newPost.images,
          city: store.getState().newPost.city,
          atUsers: store.getState().newPost.confirmedAtUsers.map(item => {
            return {
              id: item.userId,
              username: item.username,
            };
          }),
        }),
      );

      dispatch(resetState());

      handleClose();

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'newPost') {
      dispatch(resetStatus());

      showError(store.getState().newPost.error);

      return;
    }

    if (statusValue === 'success' && sceneValue === 'getLocation') {
      dispatch(resetStatus());

      dispatch(setScene('geoReverse'));

      dispatch(geoReverseAsync());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'getLocation') {
      dispatch(resetStatus());

      showError(store.getState().newPost.error);

      return;
    }

    if (statusValue === 'success' && sceneValue === 'geoReverse') {
      dispatch(resetStatus());

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'geoReverse') {
      dispatch(resetStatus());

      showError(store.getState().newPost.error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const statusBarStyle: StyleProp<ViewStyle> = {paddingTop: insets.top};

  const blurInput = () => {
    inputRef.current?.blur();
  };

  const handleClose = () => {
    blurInput();

    setTimeout(() => {
      navigation.pop();
    }, 200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.root, statusBarStyle]}>
        <Header onClose={handleClose} onPublish={handlePublish} />

        <Input ref={inputRef} style={styles.input} />

        <Location style={styles.location} />

        <Visibility
          visibility={visibilityValue}
          style={styles.visibility}
          blurInput={blurInput}
        />

        <BottomButton style={styles.bottomBtn} blurInput={blurInput} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginTop: 16,
    marginBottom: 120,
  },
  location: {
    position: 'absolute',
    bottom: 70,
    left: 20,
  },
  visibility: {
    position: 'absolute',
    bottom: 68,
    right: 20,
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
  },
});
