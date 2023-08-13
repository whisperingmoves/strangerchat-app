import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text} from 'react-native';

import {Route, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useActionSheet} from '@expo/react-native-action-sheet';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {AVATAR, AVATAR_DESC} from '../../constants/avatar/Config';
import NextButton from '../../components/NextButton';
import AvatarContainer from './components/AvatarContainer';
import {openImagePicker} from '../../utils/image';

import BackHeader from '../../components/BackHeader';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import Loading from '../../components/Loading';
import {Mobile} from '../login/store/slice';
import {Gender} from '../gender/store/slice';
import {Birthday} from '../birthday/store/slice';
import {
  Avatar,
  resetStatus,
  status as avatarStatus,
  uploadAvatarAsync,
} from './store/slice';
import {showError} from '../../utils/notification';

type Props = {
  route: Route<string, {gender: Gender; mobile: Mobile; birthday: Birthday}>;
};

export default (props: Props) => {
  const {gender, mobile, birthday} = props.route.params;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [avatarUri, setAvatarUri] = useState('');

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const {showActionSheetWithOptions} = useActionSheet();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (selectedIndex === 8) {
      handleImagePicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const avatarStatusValue = useAppSelector(avatarStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (avatarStatusValue === 'success') {
      dispatch(resetStatus());

      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'NavigationBar'}],
      // });

      Alert.alert(JSON.stringify({gender, mobile, birthday}));

      return;
    }

    if (avatarStatusValue === 'failed') {
      dispatch(resetStatus());

      const {error} = store.getState().avatar;

      showError(error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarStatusValue]);

  const statusBarStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
  };

  const handleNextPress = () => {
    Alert.alert(JSON.stringify({gender, mobile, birthday}));
  };

  const uploadAvatar = (avatar: Avatar) => {
    setAvatarUri(avatar);

    dispatch(uploadAvatarAsync(avatar));
  };

  const handleImagePicker = () => {
    openImagePicker(showActionSheetWithOptions, uploadAvatar);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[styles.root, statusBarStyle]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <Loading visible={avatarStatusValue === 'loading'} />

      <BackHeader onPress={handleBackPress} style={styles.backHeader} />

      <Text style={styles.titleTxt}>{AVATAR}</Text>

      <Text style={styles.descTxt}>{AVATAR_DESC}</Text>

      <AvatarContainer
        style={styles.avatarContainer}
        handleImagePicker={handleImagePicker}
        avatarUri={avatarUri}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        gender={gender}
      />

      <NextButton style={styles.nextBtn} onPress={handleNextPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  backHeader: {
    marginTop: 16,
    marginLeft: -10,
  },
  titleTxt: {
    color: '#554C5F',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 54,
  },
  descTxt: {
    color: '#8E8895',
    fontSize: 16,
    marginTop: 16,
  },
  avatarContainer: {
    marginTop: 36,
  },
  nextBtn: {
    flex: 1,
    marginHorizontal: 82,
    marginTop: 86,
  },
});
