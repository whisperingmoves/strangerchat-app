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
import {PUBLIC} from '../../constants/newPost/Config';
import Input, {InputRef} from './components/Input';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  createPostAsync,
  resetState,
  resetStatus,
  scene,
  setScene,
  status,
} from './store/slice';
import {showError} from '../../utils/notification';
import {store} from '../../stores/store';

export default () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const inputRef = useRef<InputRef>(null);

  const insets = useSafeAreaInsets();

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

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

      dispatch(resetState());

      handleClose();

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'newPost') {
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

        <Location country={'Tokyo'} style={styles.location} />

        <Visibility visibility={PUBLIC} style={styles.visibility} />

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
