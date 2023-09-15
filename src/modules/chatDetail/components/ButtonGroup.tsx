import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import icon_phone from '../../../assets/images/icons/icon_phone.png';
import icon_pic from '../../../assets/images/icons/icon_picture.png';
import icon_camera from '../../../assets/images/icons/icon_camera.png';
import icon_mic from '../../../assets/images/icons/icon_mic.png';
import icon_gift from '../../../assets/images/icons/icon_gift.png';
import Gift, {GiftRef} from '../../gift/Gift';
import {
  Content,
  ContentLength,
  HandleSend,
  messageUri,
  resetmessageUri,
  resetStatus,
  scene,
  setScene,
  status,
  uploadMessageAsync,
  Uri,
} from '../store/slice';
import {checkFileExistence} from '../../../utils/file';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError} from '../../../utils/notification';
import {
  COULD_NOT_FIND_AUDIO,
  COULD_NOT_FIND_IMAGE,
} from '../../../constants/Config';
import {selectPhoto, takePhoto} from '../../../utils/image';
import {store} from '../../../stores/store';
import AudioRecorder, {AudioRecorderRef} from './AudioRecorder';

type Props = {
  style: ViewStyle;
  blurInput: () => void;
  handleSend: HandleSend;
};

export default (props: Props) => {
  const giftRef = useRef<GiftRef>(null);

  const audioRecorderRef = useRef<AudioRecorderRef>(null);

  const dispatch = useAppDispatch();

  const sceneValue = useAppSelector(scene);

  const statusValue = useAppSelector(status);

  const messageUriValue = useAppSelector(messageUri);

  const [messageType, setMessageType] = useState(0);

  const [recordSecsValue, setRecordSecsValue] = useState<ContentLength>(0);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'uploadMessage' &&
      messageUriValue
    ) {
      dispatch(resetStatus());

      dispatch(resetmessageUri());

      if (messageType === 1) {
        audioRecorderRef.current?.hide();
      }

      props.handleSend(
        messageUriValue as Content,
        messageType,
        undefined,
        messageType === 1 ? recordSecsValue : undefined,
      );

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'uploadMessage') {
      dispatch(resetStatus());

      showError(store.getState().chatDetail.error);

      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props, sceneValue, statusValue, messageUriValue, messageType]);

  const uploadMessage = useCallback(
    (uri: Uri) => {
      const errorMsg =
        messageType === 2
          ? COULD_NOT_FIND_IMAGE
          : messageType === 1
          ? COULD_NOT_FIND_AUDIO
          : '';

      checkFileExistence(uri)
        .then(result => {
          if (result) {
            dispatch(setScene('uploadMessage'));

            dispatch(uploadMessageAsync(uri));
          } else {
            showError(errorMsg);
          }
        })
        .catch(() => {
          showError(errorMsg);
        });
    },
    [dispatch, messageType],
  );

  const handleSelectPhoto = useCallback(() => {
    props.blurInput();

    setTimeout(async () => {
      uploadMessage(await selectPhoto());
    }, 200);
  }, [props, uploadMessage]);

  const handleTakePhoto = useCallback(() => {
    props.blurInput();

    setTimeout(async () => {
      uploadMessage(await takePhoto());
    }, 200);
  }, [props, uploadMessage]);

  const handleAudioRecorderConfirm = useCallback(
    (audioUri: string, recordSecs: number) => {
      setRecordSecsValue(recordSecs);

      uploadMessage(audioUri);
    },
    [uploadMessage],
  );

  const handleAudioRecorderCancel = useCallback(() => {
    audioRecorderRef.current?.hide();
  }, []);

  return (
    <View style={[styles.root, props.style]}>
      {btnList.map((value, index) => {
        const handlePress = () => {
          if (index === 1) {
            setMessageType(2);

            handleSelectPhoto();
          } else if (index === 2) {
            setMessageType(2);

            handleTakePhoto();
          } else if (index === 3) {
            setMessageType(1);

            audioRecorderRef.current?.show();
          } else if (index === 4) {
            setMessageType(5);

            giftRef.current?.show();
          }
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={handlePress}>
            <Image source={value} />
          </TouchableOpacity>
        );
      })}

      <Gift ref={giftRef} handleSend={props.handleSend} />

      <AudioRecorder
        ref={audioRecorderRef}
        onCancel={handleAudioRecorderCancel}
        onConfirm={handleAudioRecorderConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const btnList: ImageSourcePropType[] = [
  icon_phone,
  icon_pic,
  icon_camera,
  icon_mic,
  icon_gift,
];
