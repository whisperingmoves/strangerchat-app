import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import Item, {Props as ItemProps} from './Item';

import Separator from './Separator';
import {ConversationId, OpponentAvatar} from '../../chat/store/slice';
import {
  getRecentChatMessagesAsync,
  messageMap,
  SentTime,
  setScene,
} from '../store/slice';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../stores/store';
import ListFooter from '../../../components/ListFooter';
import {isTimestampExpired} from '../../../utils/date';
import Config from 'react-native-config';
import {InputRef} from '../../../components/Input';
import ImageView from '../../../components/imageViewing/ImageViewing';
import ImageFooter from '../../../components/photoList/ImageFooter';
import {generateFullURL} from '../../helper';

type Props = {
  conversationId?: ConversationId;
  clientConversationId?: ConversationId;
  opponentAvatar: OpponentAvatar;
  style: StyleProp<ViewStyle>;
  inputRef: RefObject<InputRef>;
};

const renderItem = ({item}: {item: ItemProps}) => <Item {...item} />;

const keyExtractor = (item: ItemProps, index: number) => `${index}`;

export default (props: Props) => {
  const messageMapValue = useAppSelector(messageMap);

  const ref = useRef<FlatList>(null);

  const dispatch = useAppDispatch();

  const conversationId = (props.conversationId ||
    props.clientConversationId) as ConversationId;

  const messageList = useMemo(
    () => messageMapValue[conversationId] || [],
    [messageMapValue, conversationId],
  );

  const imageList = useMemo(
    () =>
      messageList
        .filter(message => message.type === 2)
        .sort((a, b) => a.sentTime - b.sentTime)
        .map(message => ({
          uri: message.content,
        })),
    [messageList],
  );

  const imageFullUriList = useMemo(
    () =>
      imageList.map(image => ({
        uri: generateFullURL(image.uri),
      })),
    [imageList],
  );

  const [visible, setIsVisible] = useState(false);
  const [imageIndexValue, setImageIndexValue] = useState(0);

  useEffect(() => {
    if (!props.conversationId) {
      return;
    }

    dispatch(setScene('getRecentChatMessages'));

    dispatch(
      getRecentChatMessagesAsync({
        conversationId: props.conversationId,
        timestamp: messageList.length ? messageList[0].sentTime : undefined,
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageClick = useCallback((imageIdx: number) => {
    setImageIndexValue(imageIdx);

    setIsVisible(true);
  }, []);

  const data: ItemProps[] = messageList.map((message, messageIndex) => {
    const isSelf = message.senderId === store.getState().user.userId;

    let sentTime: SentTime | undefined;

    if (
      (messageIndex < messageList.length - 1 &&
        message.sentTime - messageList[messageIndex + 1].sentTime > 60) ||
      messageIndex === messageList.length - 1
    ) {
      sentTime = message.sentTime;
    }

    const sendStatus = message.sendStatus
      ? message.sendStatus
      : !message.messageId
      ? isTimestampExpired(
          message.sentTime,
          parseInt(Config.TIME_OUT as string, 10),
        )
        ? 1
        : 0
      : 0;

    const imageIndex =
      message.type === 2
        ? imageList.findIndex(image => image.uri === message.content)
        : undefined;

    const onImageClick = message.type === 2 ? handleImageClick : undefined;

    return {
      conversationId: message.conversationId,
      messageId: message.messageId,
      clientMessageId: message.clientMessageId,
      senderId: message.senderId,
      sentTime,
      content: message.content,
      contentLength: message.contentLength,
      type: message.type,
      avatar: isSelf ? undefined : props.opponentAvatar,
      readStatus: message.readStatus,
      sendStatus: sendStatus,
      isSelf,
      inputRef: props.inputRef,
      imageIndex,
      onImageClick,
    };
  });

  const onRequestClose = () => setIsVisible(false);

  const renderFooter = ({imageIndex: imageIdx}: {imageIndex: number}) => (
    <ImageFooter imageIndex={imageIdx} imagesCount={imageList.length} />
  );

  const presentationStyle =
    Platform.OS === 'android' ? 'overFullScreen' : 'fullScreen';

  return (
    <>
      <FlatList
        style={styles.root}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={[styles.contentContainer, props.style]}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ListFooter tabBarHeight={90} />}
        ListFooterComponent={<ListFooter tabBarHeight={106} />}
        ref={ref}
        inverted
      />

      <ImageView
        images={imageFullUriList}
        imageIndex={imageIndexValue}
        visible={visible}
        onRequestClose={onRequestClose}
        presentationStyle={presentationStyle}
        FooterComponent={renderFooter}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
