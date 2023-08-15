import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {LOADING} from '../constants/Config';

type Props = {
  visible: boolean;
  text?: string;
};

export default ({visible, text}: Props) => {
  return (
    <Spinner
      visible={visible}
      textContent={text ? text : `${LOADING}...`}
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
  },
});
