import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_backtrack from '../../../assets/images/icons/icon_backtrack.png';
import icon_friend from '../../../assets/images/icons/icon_friend.png';
import {FOLLOWING} from '../../../constants/Config';
import {FRIEND} from '../../../constants/myFollowing/Config';

type Props = {
  style: StyleProp<ViewStyle>;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.root, props.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.backBtn}>
        <Image source={icon_backtrack} />
      </TouchableOpacity>

      <Text style={styles.followingTxt}>{FOLLOWING}</Text>

      <TouchableOpacity activeOpacity={0.7} style={styles.container}>
        <Image source={icon_friend} />

        <Text style={styles.friendTxt}>{FRIEND}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 0,
  },
  followingTxt: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  container: {
    height: 30,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#F1F0F3',
    borderRadius: 15,
  },
  friendTxt: {
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
    fontWeight: 'bold',
  },
});
