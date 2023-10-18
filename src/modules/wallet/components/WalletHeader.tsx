import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import TotalAssets from './TotalAssets';
import ButtonGroup from './ButtonGroup';
import DatePicker from './DatePicker';
import {RECENTLY_TRANSACTIONS, WALLET} from '../../../constants/wallet/Config';
import DetailHeader from '../../../components/DetailHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  style: StyleProp<ViewStyle>;
  scrollToListItem: () => void;
};

export default (props: Props) => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, props.style]}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        style={[styles.background, statusBarStyle]}>
        <DetailHeader
          style={styles.header}
          onBackPress={handleBackPress}
          foregroundColor={'#FFF'}
          title={WALLET}
          hideMore={true}
        />

        <TotalAssets style={styles.totalAssets} />
      </LinearGradient>

      <ButtonGroup
        style={styles.buttonGroup}
        scrollToListItem={props.scrollToListItem}
      />

      <Text style={styles.recentTxt}>{RECENTLY_TRANSACTIONS}</Text>

      <DatePicker style={styles.datePicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  background: {
    width: '100%',
    height: 268,
  },
  header: {
    marginTop: 8,
  },
  totalAssets: {
    marginTop: 60,
    marginBottom: 26,
  },
  buttonGroup: {
    marginHorizontal: 20,
    marginTop: -32,
  },
  recentTxt: {
    marginHorizontal: 20,
    marginTop: 30,
    color: '#554C5F',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  datePicker: {
    marginTop: 18,
  },
});
