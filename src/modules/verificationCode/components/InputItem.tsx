import React, {RefObject} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

import {NativeSyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';

import {TextInputKeyPressEventData} from 'react-native/Libraries/Components/TextInput/TextInput';

import icon_selected from '../../../assets/icon_selected.png';
import icon_unselected from '../../../assets/icon_unselected.png';

import {isNumeric} from '../../../utils/validation';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onBackspace: () => void;
  inputRef: RefObject<TextInput>;
  onSubmitEditing: () => void;
};

export default (props: Props) => {
  const handleChange = (newValue: string) => {
    if (newValue && !isNumeric(newValue)) {
      return;
    }

    props.onChange(newValue);

    if (newValue) {
      props.onSubmitEditing();
    }
  };

  const handleKeyPress = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (nativeEvent.key === 'Backspace') {
      props.onBackspace();

      handleChange('');
    } else {
      handleChange(nativeEvent.key);
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.txt}
        maxLength={1}
        keyboardType={'number-pad'}
        value={props.value}
        ref={props.inputRef}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        returnKeyType={'done'}
      />

      <Image source={props.value ? icon_selected : icon_unselected} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 8,
    alignItems: 'center',
  },
  txt: {
    color: '#000',
    fontSize: 20,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 0,
  },
});
