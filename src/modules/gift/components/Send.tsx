import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SEND} from '../../../constants/Config';
import {HandleSend, resetSelectedGift, selectedGift} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {coinBalance} from '../../../stores/user/slice';
import {showError} from '../../../utils/notification';
import {INSUFFICIENT_GOLD_BALANCE} from '../../../constants/gift/Config';

type Props = {
  handleSend: HandleSend;
  hide: () => void;
};

export default (props: Props) => {
  const gift = useAppSelector(selectedGift);

  const coinBalanceValue = useAppSelector(coinBalance);

  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (!gift) {
      return;
    }

    if (!coinBalanceValue || gift.value > coinBalanceValue) {
      showError(INSUFFICIENT_GOLD_BALANCE);

      return;
    }

    props.handleSend(gift);

    setTimeout(() => {
      props.hide();

      dispatch(resetSelectedGift());
    }, 200);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={!gift}>
      <LinearGradient
        colors={['#D988FF', '#8B5CFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.root}>
        <Text style={styles.txt}>{SEND}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: '#FFF',
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
});
