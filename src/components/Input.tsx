import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SAY_SOMETHING} from '../constants/chatDetail/Config';

import icon_emoji from '../assets/images/icons/icon_emoji.png';

type Props = {
  placeholder?: string;
  onSend: (value: string) => void;
};

export default (props: Props) => {
  const [value, setValue] = useState<string>('');

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  const handlePress = () => {
    if (!value) {
      return;
    }

    setValue('');

    props.onSend(value);
  };

  return (
    <View style={styles.root}>
      <TextInput
        placeholder={props.placeholder ? props.placeholder : SAY_SOMETHING}
        placeholderTextColor={'#C7C4CC'}
        style={styles.input}
        multiline={true}
        selectionColor={'#8B5CFF'}
        value={value}
        onChangeText={handleChangeText}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={!value}>
        <Image source={icon_emoji} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: '#F1F0F3',
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    color: '#554C5F',
    padding: 0,
  },
});