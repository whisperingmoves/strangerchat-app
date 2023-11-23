import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

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
import AvatarContainer from './components/AvatarContainer';
import {openImagePicker} from '../../utils/image';

import BackHeader from '../../components/BackHeader';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {store} from '../../stores/store';
import {Mobile} from '../login/store/slice';
import {Gender} from '../gender/store/slice';
import {Birthday} from '../birthday/store/slice';
import {
  Avatar,
  resetStatus as resetAvatarStatus,
  status as avatarStatus,
  uploadAvatarAsync,
  url as avatarUrl,
} from './store/slice';
import {showError} from '../../utils/notification';
import {RegisterUserRequest} from '../../apis/user/registerUser';
import {
  Language,
  registerUserAsync,
  resetStatus as resetUserStatus,
  setScene,
  setUser,
  status as userStatus,
} from '../../stores/user/slice';
import {GeoPosition} from 'react-native-geolocation-service';
import {checkFileExistence} from '../../utils/file';
import {COULD_NOT_FIND_IMAGE} from '../../constants/Config';
import {AVATAR_BOY_URL_LIST, AVATAR_GIRL_URL_LIST} from '../helper';
import {socket} from '../../apis/socket';
import {getLocales} from 'react-native-localize';

type Props = {
  route: Route<string, {gender: Gender; mobile: Mobile; birthday: Birthday}>;
};

export default (props: Props) => {
  const {gender, mobile, birthday} = props.route.params;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const avatarUri = useAppSelector(avatarUrl);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const {showActionSheetWithOptions} = useActionSheet();

  const insets = useSafeAreaInsets();

  const AVATAR_URL_LIST =
    gender === 'male' ? AVATAR_BOY_URL_LIST : AVATAR_GIRL_URL_LIST;

  useEffect(() => {
    if (selectedIndex === 8) {
      handleImagePicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const avatarStatusValue = useAppSelector(avatarStatus);

  const userStatusValue = useAppSelector(userStatus);

  const dispatch = useAppDispatch();

  const [languageCode, setLanguageCode] = useState<Language>('');

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

      const payload: any = {
        mobile,
        gender,
        birthday,
        avatar:
          selectedIndex === 8 ? avatarUri : AVATAR_URL_LIST[selectedIndex],
      };

      if (languageCode) {
        payload.language = languageCode;
      }

      dispatch(setUser(payload));

      navigation.reset({
        index: 0,
        routes: [{name: 'NavigationBar'}],
      });

      socket.connect();

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
      avatar: selectedIndex === 8 ? avatarUri : AVATAR_URL_LIST[selectedIndex],
    };

    const position: GeoPosition | undefined = store.getState().login.position;

    if (position) {
      params.longitude = position.coords.longitude;
      params.latitude = position.coords.latitude;
    }

    const locales = getLocales();

    if (locales.length > 0) {
      params.language = locales[0].languageCode;

      setLanguageCode(locales[0].languageCode);
    }

    dispatch(setScene('avatar'));

    dispatch(registerUserAsync(params));
  };

  const uploadAvatar = (avatar: Avatar) => {
    checkFileExistence(avatar)
      .then(result => {
        if (result) {
          dispatch(uploadAvatarAsync(avatar));
        } else {
          showError(COULD_NOT_FIND_IMAGE);
        }
      })
      .catch(() => showError(COULD_NOT_FIND_IMAGE));
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
