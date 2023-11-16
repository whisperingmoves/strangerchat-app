import React, {useCallback, useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_details from '../../../assets/images/icons/icon_details.png';
import {DETAILS} from '../../../constants/chatDetail/Config';
import {OpponentUserId} from '../../chat/store/slice';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TabBarHeightContext} from '../../../contexts/TabBarHeightContext';

type Props = {
  style: ViewStyle;
  opponentUserId: OpponentUserId;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const tabBarHeight = useContext(TabBarHeightContext);

  const handlePress = useCallback(() => {
    navigation.push('Profile', {
      tabBarHeight,
      profileUserIdValue: props.opponentUserId,
    });
  }, [navigation, props.opponentUserId, tabBarHeight]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={props.style}
      onPress={handlePress}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.root}>
        <Image style={styles.icon} source={icon_details} />

        <Text style={styles.txt}>{DETAILS}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 86,
    height: 36,
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  icon: {
    width: 14,
    height: 12,
    resizeMode: 'cover',
  },
  txt: {
    color: '#FFF',
    fontSize: 12,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
