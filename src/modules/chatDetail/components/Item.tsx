import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Image,
  Platform,
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
  ContentLength,
  ConversationId,
  deleteMessage,
  IsCached,
  markMessageAsReadAsync,
  MessageId,
  ReadStatus,
  SenderId,
  SendStatus,
  SentTime,
  setMessage,
  setScene,
  Type,
} from '../store/slice';
import {OpponentAvatar} from '../../chat/store/slice';
import {generateFullURL} from '../../helper';
import {formatTimestamp} from '../../../utils/date';
import {useAppDispatch} from '../../../hooks';
import MessageStatusIndicator from '../../../components/MessageStatusIndicator';
import {InputRef} from '../../../components/Input';
import VoiceMessage from './VoiceMessage';
import {showError} from '../../../utils/notification';
import {
  IMAGE_CACHE_FAILURE,
  VOICE_CACHE_FAILURE,
} from '../../../constants/chatDetail/Config';
import RNFS, {DownloadProgressCallbackResult} from 'react-native-fs';
import {getFileName} from '../../../utils/file';
import CircularProgress from 'react-native-circular-progress-indicator';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';

export type Props = {
  conversationId: ConversationId;
  messageId: MessageId;
  clientMessageId?: MessageId;
  senderId: SenderId;
  sentTime?: SentTime;
  content: Content;
  contentLength?: ContentLength;
  type?: Type;
  avatar?: OpponentAvatar;
  readStatus?: ReadStatus;
  sendStatus?: SendStatus;
  isSelf?: boolean;
  inputRef: RefObject<InputRef>;
  imageIndex?: number;
  onImageClick?: (imageIndex: number) => void;
  isCached?: IsCached;
};

export default (props: Props) => {
  const {width: windowWidth} = useWindowDimensions();

  const [cacheProgressValue, setCacheProgressValue] = useState(0);

  const [cacheProgressWidth, setCacheProgressWidth] = useState(0);

  const dispatch = useAppDispatch();

  const isSelf = props.isSelf;

  const textContainerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      backgroundColor: isSelf ? '#8B5CFF' : '#F1F0F3',
      borderTopLeftRadius: isSelf ? 20 : 0,
      borderTopRightRadius: isSelf ? 0 : 20,
      maxWidth: windowWidth - 20 * 2 - 46 - 6 - cacheProgressWidth,
    };
  }, [cacheProgressWidth, isSelf, windowWidth]);

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

    if (!props.type) {
      props.inputRef.current?.setText(props.content);
    }
  };

  useEffect(() => {
    if (
      !isSelf &&
      props.conversationId &&
      props.messageId &&
      props.readStatus !== 1
    ) {
      dispatch(setScene('markMessageAsRead'));

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

  const handleImageMessageClick = useCallback(() => {
    if (!props.onImageClick) {
      return;
    }

    props.onImageClick(props.imageIndex as number);
  }, [props]);

  const photoUri = useMemo(
    () =>
      (props.type === 2 || props.type === 5) && generateFullURL(props.content),
    [props.content, props.type],
  );

  const voiceLocalUri = useMemo(
    () =>
      Platform.OS === 'android'
        ? RNFS.TemporaryDirectoryPath + '/' + getFileName(props.content)
        : getFileName(props.content),
    [props.content],
  );

  const voiceUri = useMemo(() => {
    if (props.type === 1 && props.isCached !== 1) {
      return '';
    }

    if (props.type === 1 && props.isCached === 1) {
      return voiceLocalUri;
    }
  }, [props.type, props.isCached, voiceLocalUri]);

  useEffect(() => {
    (props.type === 2 || props.type === 5) &&
      props.isCached !== 1 &&
      Image.prefetch(photoUri as string)
        .then(() => {
          dispatch(
            setMessage({
              conversationId: props.conversationId,
              messageId: props.messageId,
              clientMessageId: props.clientMessageId,
              isCached: 1,
            }),
          );
        })
        .catch(() => {
          showError(IMAGE_CACHE_FAILURE);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCacheProgress = useCallback(
    (res: DownloadProgressCallbackResult) => {
      setCacheProgressValue(
        Math.floor((res.bytesWritten / res.contentLength) * 100),
      );
    },
    [setCacheProgressValue],
  );

  useEffect(() => {
    props.type === 1 &&
      props.isCached !== 1 &&
      props.messageId !== '' &&
      RNFS.downloadFile({
        fromUrl: generateFullURL(props.content),
        toFile: voiceLocalUri,
        progress: handleCacheProgress,
      })
        .promise.then(() => {
          dispatch(
            setMessage({
              conversationId: props.conversationId,
              messageId: props.messageId,
              clientMessageId: props.clientMessageId,
              isCached: 1,
              content: voiceLocalUri,
            }),
          );
        })
        .catch(() => {
          showError(VOICE_CACHE_FAILURE);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceLocalUri, props.messageId]);

  const handleCacheProgressLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      setCacheProgressWidth(event.nativeEvent.layout.width);
    },
    [],
  );

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

        {props.type === 1 && (
          <VoiceMessage
            messageId={(props.messageId || props.clientMessageId) as MessageId}
            duration={props.contentLength as ContentLength}
            voiceUri={voiceUri as Content}
            containerStyle={[styles.textContainer, textContainerStyle]}
            isSelf={isSelf}
            durationTextStyle={[styles.text, textStyle]}
          />
        )}

        {props.type === 1 && props.isCached !== 1 && (
          <View onLayout={handleCacheProgressLayoutChange}>
            <CircularProgress
              value={cacheProgressValue}
              radius={10}
              activeStrokeWidth={3}
              inActiveStrokeWidth={6}
              activeStrokeColor={textStyle.color as string | undefined}
              inActiveStrokeColor={
                textContainerStyle.backgroundColor as string | undefined
              }
              progressValueColor={'#FFFFFF00'}
            />
          </View>
        )}

        {(props.type === 2 || props.type === 5) && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleImageMessageClick}>
            <ResizeImage
              photoUri={photoUri as string}
              defaultHeight={120}
              styles={styles.image}
            />
          </TouchableOpacity>
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
