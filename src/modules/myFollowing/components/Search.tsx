import React, {useCallback, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_search from '../../../assets/images/icons/icon_search.png';
import {SEARCH_PLACEHOLDER} from '../../../constants/myFollowing/Config';
import {useAppDispatch} from '../../../hooks';
import {setKeyword as setFollowerKeyword} from '../../follower/store/slice';
import {setKeyword as setFollowingUserKeyword} from '../../followingUser/store/slice';
import {setKeyword as setCloseFriendKeyword} from '../../closeFriend/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const [keyword, setKeyword] = useState('');

  const dispatch = useAppDispatch();

  const handleChangeText = useCallback(
    (text: string) => {
      setKeyword(text);

      dispatch(setFollowerKeyword(text));

      dispatch(setFollowingUserKeyword(text));

      dispatch(setCloseFriendKeyword(text));
    },
    [dispatch],
  );

  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image source={icon_search} />
      </TouchableOpacity>

      <TextInput
        placeholder={SEARCH_PLACEHOLDER}
        placeholderTextColor={'#8E8895'}
        style={styles.txt}
        selectionColor={'#8B5CFF'}
        value={keyword}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    flex: 1,
    height: 'auto',
  },
});
