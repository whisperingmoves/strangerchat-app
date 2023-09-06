import React, {useContext, useEffect} from 'react';
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
  markMessageAsReadAsync,
  MessageId,
  ReadStatus,
  SenderId,
  SentTime,
  Type,
} from '../store/slice';
import {OpponentAvatar} from '../../chat/store/slice';
import {generateFullURL} from '../../helper';
import {formatTimestamp} from '../../../utils/date';
import {useAppDispatch} from '../../../hooks';
import {SocketContext} from '../../../contexts/SocketContext';

export type Props = {
  conversionId: ConversationId;
  messageId: MessageId;
  senderId: SenderId;
  sentTime?: SentTime;
  content: Content;
  type?: Type;
  avatar?: OpponentAvatar;
  readStatus?: ReadStatus;
  isSelf?: boolean;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

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
    alignItems: isSelf
      ? 'flex-end'
      : props.type === 0 && props.content
      ? 'center'
      : 'flex-start',
  };

  useEffect(() => {
    if (
      !isSelf &&
      props.conversionId &&
      props.messageId &&
      props.readStatus !== 1
    ) {
      dispatch(
        markMessageAsReadAsync({
          data: {
            conversationId: props.conversionId,
            messageId: props.messageId,
          },
          socket,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        {isSelf && props.readStatus === 1 && <Image source={icon_have_read} />}

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
});
