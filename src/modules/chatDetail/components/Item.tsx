import React, {RefObject, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import icon_have_read from '../../../assets/images/icons/icon_have_read.png';
import ResizeImage from '../../../components/ResizeImage';
import {
  Content,
  ConversationId,
  deleteMessage,
  markMessageAsReadAsync,
  MessageId,
  ReadStatus,
  SenderId,
  SendStatus,
  SentTime,
  Type,
} from '../store/slice';
import {OpponentAvatar} from '../../chat/store/slice';
import {generateFullURL} from '../../helper';
import {formatTimestamp} from '../../../utils/date';
import {useAppDispatch} from '../../../hooks';
import MessageStatusIndicator from '../../../components/MessageStatusIndicator';
import {InputRef} from '../../../components/Input';

export type Props = {
  conversationId: ConversationId;
  messageId: MessageId;
  clientMessageId?: MessageId;
  senderId: SenderId;
  sentTime?: SentTime;
  content: Content;
  type?: Type;
  avatar?: OpponentAvatar;
  readStatus?: ReadStatus;
  sendStatus?: SendStatus;
  isSelf?: boolean;
  inputRef: RefObject<InputRef>;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const dispatch = useAppDispatch();

  const isSelf = props.isSelf;

  const textContainerStyle: StyleProp<ViewStyle> = {
    backgroundColor: isSelf ? '#8B5CFF' : '#F1F0F3',
    borderTopLeftRadius: isSelf ? 20 : 0,
    borderTopRightRadius: isSelf ? 0 : 20,
    maxWidth: windowWidth - 20 * 2 - 46 - 6,
  };

  const textStyle: StyleProp<TextStyle> = {
    color: isSelf ? '#FFF' : '#554C5F',
  };

  const contentContainerStyle: StyleProp<ViewStyle> = {
    flexDirection: isSelf ? 'row-reverse' : 'row',
    alignItems:
      isSelf && props.sendStatus !== 1
        ? 'flex-end'
        : isSelf && props.sendStatus === 1
        ? 'center'
        : props.type === 0 && props.content
        ? 'center'
        : 'flex-start',
  };

  const handleResend = () => {
    dispatch(
      deleteMessage({
        clientMessageId: props.clientMessageId,
        messageId: props.messageId,
        conversationId: props.conversationId,
      }),
    );

    props.inputRef.current?.setText(props.content);
  };

  useEffect(() => {
    if (
      !isSelf &&
      props.conversationId &&
      props.messageId &&
      props.readStatus !== 1
    ) {
      dispatch(
        markMessageAsReadAsync({
          conversationId: props.conversationId,
          messageId: props.messageId,
        }),
      );
    }
  }, [
    dispatch,
    isSelf,
    props.conversationId,
    props.messageId,
    props.readStatus,
  ]);

  return (
    <View style={styles.root}>
      {props.sentTime && (
        <Text style={styles.sentTimeTxt}>
          {formatTimestamp(props.sentTime)}
        </Text>
      )}

      <View style={contentContainerStyle}>
        {!isSelf && props.avatar && (
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={{uri: generateFullURL(props.avatar)}}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}

        {!props.type && (
          <View style={[styles.textContainer, textContainerStyle]}>
            <Text style={[styles.text, textStyle]}>{props.content}</Text>
          </View>
        )}

        {isSelf && props.readStatus === 1 && props.sendStatus !== 1 && (
          <Image source={icon_have_read} />
        )}

        {isSelf && props.sendStatus === 1 && (
          <MessageStatusIndicator
            style={styles.messageStatusIndicator}
            onPress={handleResend}
          />
        )}

        {props.type === 2 && (
          <ResizeImage
            photoUri={generateFullURL(props.content)}
            defaultHeight={120}
            styles={styles.image}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
    width: '100%',
  },
  sentTimeTxt: {
    color: '#C7C4CC',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 25,
    resizeMode: 'cover',
    marginRight: 6,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    fontSize: 14,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  image: {
    width: 80,
    borderRadius: 10,
  },
  messageStatusIndicator: {
    transform: [
      {
        scale: 1.5,
      },
    ],
    marginRight: 12,
  },
});
