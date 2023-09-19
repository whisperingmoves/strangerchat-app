import React from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_close from '../../../assets/images/icons/icon_close.png';
import icon_check from '../../../assets/images/icons/icon_check.png';
import {useAppSelector} from '../../../hooks';
import {checkedAtUsers} from '../store/slice';
import {CONFIRM} from '../../../constants/newPost/Config';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default (props: Props) => {
  const checkedAtUsersValue = useAppSelector(checkedAtUsers);

  const confirmIconStyle: ImageStyle = {
    tintColor: checkedAtUsersValue.length ? '#8B5CFF' : '#C7C4CC',
  };

  const confirmTxtStyle: TextStyle = {
    color: checkedAtUsersValue.length ? '#8B5CFF' : '#C7C4CC',
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity activeOpacity={0.7} onPress={props.onClose}>
        <Image source={icon_close} style={styles.closeImg} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.confirmBtn}
        disabled={!checkedAtUsersValue.length}
        onPress={props.onConfirm}>
        <Image
          source={icon_check}
          style={[styles.closeImg, confirmIconStyle]}
        />

        <Text style={[styles.confirmTxt, confirmTxtStyle]}>{CONFIRM}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#F1F0F3',
    borderBottomWidth: 1,
  },
  closeImg: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
  },
  confirmBtn: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  confirmTxt: {
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
