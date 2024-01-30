// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import React, {RefObject} from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

import {NativeSyntheticEvent} from 'react-native/Libraries/Types/CoreEventTypes';

import {TextInputKeyPressEventData} from 'react-native/Libraries/Components/TextInput/TextInput';

import icon_selected from '../../../assets/images/icons/icon_selected.png';
import icon_unselected from '../../../assets/images/icons/icon_unselected.png';

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
