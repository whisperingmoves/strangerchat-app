import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {SAY_SOMETHING} from '../constants/chatDetail/Config';

import icon_send from '../assets/images/icons/icon_send.png';

export interface InputRef {
  blur: () => void;
  setText: (text: string) => void;
}

type Props = {
  placeholder?: string;
  onSend: (value: string) => void;
};

export default forwardRef((props: Props, ref) => {
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<TextInput>(null);

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

  const blur = () => {
    inputRef.current?.blur();
  };

  const setText = (text: string) => {
    setValue(text);

    inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      blur,
      setText,
    };
  });

  const sendIconStyle: ImageStyle = {
    tintColor: value ? '#8B5CFF' : '#C7C4CC',
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
        ref={inputRef}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={!value}>
        <Image source={icon_send} style={[sendIconStyle, styles.icon]} />
      </TouchableOpacity>
    </View>
  );
});

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
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});
