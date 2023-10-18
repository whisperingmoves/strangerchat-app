import React, {useMemo, useRef} from 'react';
import {StyleSheet, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Button, {Props as ButtonProps} from './Button';

import icon_top_up from '../../../assets/images/icons/icon_top_up.png';
import icon_transactions from '../../../assets/images/icons/icon_transactions.png';
import {TOP_UP} from '../../../constants/Config';
import {TRANSACTIONS} from '../../../constants/wallet/Config';
import TopUp, {Ref as TopUpRef} from './TopUp';

type Props = {
  style: StyleProp<ViewStyle>;
  scrollToListItem: () => void;
};

export default (props: Props) => {
  const topUpRef = useRef<TopUpRef>(null);

  const BUTTON_LIST: ButtonProps[] = useMemo(() => {
    return [
      {
        tintColor: '#40B2FF10',
        icon: icon_top_up,
        label: TOP_UP,
        onPress: () => {
          topUpRef.current?.show();
        },
      },
      {
        tintColor: '#FF428810',
        icon: icon_transactions,
        label: TRANSACTIONS,
        onPress: props.scrollToListItem,
      },
      // {
      //   tintColor: '#8B5CFF10',
      //   icon: icon_upload,
      //   label: SEND,
      // },
      // {
      //   tintColor: '#8B5CFF10',
      //   icon: icon_category,
      //   label: MORE,
      // },
    ];
  }, []);

  return (
    <View style={[styles.root, props.style]}>
      {BUTTON_LIST.map((value, index) => (
        <Button {...value} key={index} />
      ))}

      <TopUp ref={topUpRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: '#8b5cff',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
});
