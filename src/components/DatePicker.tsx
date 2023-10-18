import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Props = {
  date: Date;
  setDate?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  modal?: boolean;
  open?: boolean;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
};

export default (props: Props) => {
  return (
    <View style={[styles.root, props.style]}>
      <DatePicker
        mode={'date'}
        date={props.date}
        theme={'light'}
        style={styles.datePicker}
        onDateChange={props.setDate}
        textColor={'#554C5F'}
        modal={props.modal}
        open={props.open}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  datePicker: {
    width: Dimensions.get('window').width - 60,
    height: 222,
  },
});
