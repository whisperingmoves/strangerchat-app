import React, {useCallback, useMemo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_account_security from '../../assets/images/icons/icon_account_security.png';
import icon_notice from '../../assets/images/icons/icon_notice.png';
import icon_privacy from '../../assets/images/icons/icon_privacy.png';
import icon_accessibility from '../../assets/images/icons/icon_accessibility.png';
import icon_wallet_outlined from '../../assets/images/icons/icon_wallet_outlined.png';
import icon_promote from '../../assets/images/icons/icon_promote.png';
import icon_help from '../../assets/images/icons/icon_help.png';
import icon_about from '../../assets/images/icons/icon_about.png';
import icon_logout from '../../assets/images/icons/icon_logout.png';
import {
  ABOUT_US,
  ACCESSIBILITY,
  ACCOUNT_SECURITY,
  HELP_FEEDBACK,
  NEW_NOTICE,
  PRIVACY,
  PROMOTE,
  PROMOTE_DESC,
  SETTING,
  SIGN_OUT,
} from '../../constants/setting/Config';
import Item, {Props as ItemProps} from './components/Item';
import {GOLD_COIN_RECHARGE} from '../../constants/Config';
import DetailHeader from '../../components/DetailHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyles: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, statusBarStyles]}>
      <DetailHeader
        style={styles.header}
        hideMore={true}
        onBackPress={handleBackPress}
        title={SETTING}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {MENU_LIST.map((value, index) => {
          return (
            <View key={index}>
              <Item {...value} style={styles.item} />

              {(index === 0 || index === 3 || index === 5 || index === 7) && (
                <View style={styles.line} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0F3',
    paddingVertical: 12,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  item: {
    marginVertical: 18,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1F0F3',
    marginVertical: 8,
  },
});

const MENU_LIST: ItemProps[] = [
  {
    icon: icon_account_security,
    label: ACCOUNT_SECURITY,
  },
  {
    icon: icon_notice,
    label: NEW_NOTICE,
  },
  {
    icon: icon_privacy,
    label: PRIVACY,
  },
  {
    icon: icon_accessibility,
    label: ACCESSIBILITY,
  },
  {
    icon: icon_wallet_outlined,
    label: GOLD_COIN_RECHARGE,
    target: 'Wallet',
  },
  {
    icon: icon_promote,
    label: PROMOTE,
    description: PROMOTE_DESC,
  },
  {
    icon: icon_help,
    label: HELP_FEEDBACK,
  },
  {
    icon: icon_about,
    label: ABOUT_US,
  },
  {
    icon: icon_logout,
    label: SIGN_OUT,
  },
];
