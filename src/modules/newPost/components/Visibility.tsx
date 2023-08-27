import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_earth from '../../../assets/images/icons/icon_earth.png';
import {setVisibility, Visibility, VISIBILITY_MAP} from '../store/slice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {ActionSheetOptions} from '@expo/react-native-action-sheet/lib/typescript/types';
import {useAppDispatch} from '../../../hooks';
import {PRIVATE, PUBLIC} from '../../../constants/newPost/Config';
import {CANCEL, HOME} from '../../../constants/Config';

type Props = {
  visibility?: Visibility;
  style: StyleProp<ViewStyle>;
  blurInput: () => void;
};

export default (props: Props) => {
  const {showActionSheetWithOptions} = useActionSheet();

  const dispatch = useAppDispatch();

  const handlePress = () => {
    props.blurInput();

    setTimeout(() => {
      openVisibilityPicker(showActionSheetWithOptions, visibility => {
        dispatch(setVisibility(visibility));
      });
    }, 200);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, props.style]}
      onPress={handlePress}>
      <Image source={icon_earth} />

      <Text style={styles.txt}>
        {VISIBILITY_MAP[props.visibility ? props.visibility : 0]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#F1F0F3',
  },
  txt: {
    color: '#8E8895',
    fontSize: 14,
  },
});

export const openVisibilityPicker = (
  showActionSheetWithOptions: (
    options: ActionSheetOptions,
    callback: (i?: number) => void | Promise<void>,
  ) => void,
  setValue: (visibility: Visibility) => void,
) => {
  const options = [PUBLIC, HOME, PRIVATE, CANCEL];
  const cancelButtonIndex = 3;
  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      textStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
      },
    },
    async selectedIndex => {
      if ((selectedIndex || selectedIndex === 0) && selectedIndex < 3) {
        setValue(selectedIndex);
      }
    },
  );
};
