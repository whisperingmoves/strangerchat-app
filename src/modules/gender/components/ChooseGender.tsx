import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import icon_female from '../../../assets/images/icons/icon_female.png';
import icon_male from '../../../assets/images/icons/icon_male.png';
import {Mobile} from '../../login/store/slice';
import {Gender, GENDER_MAP} from '../store/slice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  style: StyleProp<ViewStyle>;
  mobile: Mobile;
};

export default (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = (gender: Gender) => {
    return () => {
      navigation.push('Birthday', {
        gender,
        mobile: props.mobile,
      });
    };
  };

  return (
    <View style={[styles.root, props.style]}>
      {genderList.map((value, index) => (
        <View style={styles.item} key={index}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.iconBtn}
            onPress={handlePress(value.gender)}>
            <Image source={value.icon} />
          </TouchableOpacity>

          <Text style={[styles.txt, {color: value.color}]}>
            {GENDER_MAP[value.gender]}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    gap: 20,
  },
  iconBtn: {
    backgroundColor: '#F1F0F3',
    width: 134,
    height: 134,
    borderRadius: 67,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
  },
});

const genderList: {
  gender: Gender;
  icon: ImageSourcePropType;
  color: string;
}[] = [
  {
    gender: 'male',
    icon: icon_male,
    color: '#40B2FF',
  },
  {
    gender: 'female',
    icon: icon_female,
    color: '#FF4288',
  },
];
