import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ImageStyle,
  LayoutChangeEvent,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_edit from '../../../assets/images/icons/icon_edit.png';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  resetStatus,
  scene,
  setScene,
  setUser,
  status,
  updateUserProfileAsync,
  userId,
  username,
} from '../../../stores/user/slice';
import {username as profileUsername} from '../store/slice';
import {getUsername} from '../../helper';
import {showError} from '../../../utils/notification';
import {store} from '../../../stores/store';
import {UserIdContext} from '../context/UserIdContext';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const profileUserIdValue = useContext(UserIdContext);

  const [textWidth, setTextWidth] = useState(102);

  const handleLayoutChange = useCallback((event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  }, []);

  const btnStyle: ImageStyle = useMemo(() => {
    return {
      left: textWidth + 4,
    };
  }, [textWidth]);

  const userIdValue = useAppSelector(userId);

  const usernameValue = useAppSelector(username);

  const profileUsernameValue = useAppSelector(profileUsername);

  const inputRef = useRef<TextInput>(null);

  const [editable, setEditable] = useState(false);

  const handleEditPress = useCallback(() => {
    setEditable(true);
  }, []);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [editable]);

  const dispatch = useAppDispatch();

  const [usernameInput, setUsernameInput] = useState('');

  const handleSubmitEditing = useCallback(() => {
    setEditable(false);

    dispatch(setScene('updateUsername'));

    dispatch(updateUserProfileAsync({username: usernameInput}));
  }, [dispatch, usernameInput]);

  const statusValue = useAppSelector(status);

  const sceneValue = useAppSelector(scene);

  useEffect(() => {
    if (statusValue === 'success' && sceneValue === 'updateUsername') {
      dispatch(resetStatus());

      dispatch(setUser({username: usernameInput}));

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'updateUsername') {
      dispatch(resetStatus());

      showError(store.getState().user.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusValue]);

  const usernameTxt = useMemo(
    () =>
      !profileUserIdValue
        ? usernameValue
          ? usernameValue
          : getUsername(userIdValue)
        : profileUsernameValue
        ? profileUsernameValue
        : getUsername(profileUserIdValue),
    [profileUserIdValue, profileUsernameValue, userIdValue, usernameValue],
  );

  const editableValue = useMemo<boolean>(
    () => (!profileUserIdValue ? editable : false),
    [editable, profileUserIdValue],
  );

  return (
    <View style={[styles.root, props.style]}>
      <TextInput
        style={styles.txt}
        onLayout={handleLayoutChange}
        editable={editableValue}
        ref={inputRef}
        onSubmitEditing={handleSubmitEditing}
        blurOnSubmit={true}
        onChangeText={setUsernameInput}>
        {usernameTxt}
      </TextInput>

      {!profileUserIdValue && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn, btnStyle]}
          onPress={handleEditPress}>
          <Image source={icon_edit} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 20,
    textAlignVertical: 'center',
    includeFontPadding: false,
    padding: 0,
  },
  btn: {
    position: 'absolute',
  },
  icon: {
    tintColor: '#FFF',
  },
});
