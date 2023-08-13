import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text} from 'react-native';

import {Route, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useActionSheet} from '@expo/react-native-action-sheet';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {
  AVATAR,
  AVATAR_CANNOT_BE_EMPTY,
  AVATAR_DESC,
} from '../../constants/avatar/Config';
import NextButton from '../../components/NextButton';
import AvatarContainer, {
  AVATAR_BOY_LIST,
  AVATAR_GIRL_LIST,
} from './components/AvatarContainer';
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
  resetStatus as resetAvatarStatus,
  status as avatarStatus,
  uploadAvatarAsync,
} from './store/slice';
import {showError} from '../../utils/notification';
import {RegisterUserRequest} from '../../apis/user/registerUser';
import {
  registerUserAsync,
  resetStatus as resetUserStatus,
  scene,
  setScene,
  setUser,
  status as userStatus,
} from '../../stores/user/slice';
import {GeoPosition} from 'react-native-geolocation-service';

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

  const AVATAR_LIST = gender === 'male' ? AVATAR_BOY_LIST : AVATAR_GIRL_LIST;

  useEffect(() => {
    if (selectedIndex === 8) {
      handleImagePicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const avatarStatusValue = useAppSelector(avatarStatus);

  const userStatusValue = useAppSelector(userStatus);

  const sceneValue = useAppSelector(scene);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (avatarStatusValue === 'success') {
      dispatch(resetAvatarStatus());

      return;
    }

    if (avatarStatusValue === 'failed') {
      dispatch(resetAvatarStatus());

      const {error} = store.getState().avatar;

      showError(error);

      return;
    }

    if (userStatusValue === 'success') {
      dispatch(resetUserStatus());

      dispatch(
        setUser({
          mobile,
          gender,
          birthday,
          avatar:
            selectedIndex === 8
              ? avatarUri
              : Image.resolveAssetSource(AVATAR_LIST[selectedIndex]).uri,
        }),
      );

      navigation.reset({
        index: 0,
        routes: [{name: 'NavigationBar'}],
      });

      return;
    }

    if (userStatusValue === 'failed') {
      dispatch(resetUserStatus());

      const {error} = store.getState().user;

      showError(error);

      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarStatusValue, userStatusValue]);

  const statusBarStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
  };

  const handleNextPress = () => {
    if (selectedIndex === 8 && !avatarUri) {
      showError(AVATAR_CANNOT_BE_EMPTY);

      return;
    }

    const params: RegisterUserRequest = {
      mobile,
      gender,
      birthday,
      avatar:
        selectedIndex === 8
          ? avatarUri
          : Image.resolveAssetSource(AVATAR_LIST[selectedIndex]).uri,
    };

    const position: GeoPosition | undefined = store.getState().login.position;

    if (position) {
      params.longitude = position.coords.longitude;
      params.latitude = position.coords.latitude;
    }

    dispatch(setScene('avatar'));

    dispatch(registerUserAsync(params));
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
      <Loading
        visible={
          avatarStatusValue === 'loading' ||
          (userStatusValue === 'loading' && sceneValue === 'avatar')
        }
      />

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
