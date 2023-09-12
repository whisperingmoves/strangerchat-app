import React, {useCallback, useEffect, useRef} from 'react';
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
  HandleSend,
  messageImage,
  Photo,
  resetMessageImage,
  resetStatus,
  scene,
  setScene,
  status,
  uploadMessageAsync,
} from '../store/slice';
import {checkFileExistence} from '../../../utils/file';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError} from '../../../utils/notification';
import {COULD_NOT_FIND_IMAGE} from '../../../constants/Config';
import {selectPhoto, takePhoto} from '../../../utils/image';
import {store} from '../../../stores/store';

type Props = {
  style: ViewStyle;
  blurInput: () => void;
  handleSend: HandleSend;
};

export default (props: Props) => {
  const giftRef = useRef<GiftRef>(null);

  const dispatch = useAppDispatch();

  const sceneValue = useAppSelector(scene);

  const statusValue = useAppSelector(status);

  const messageImageValue = useAppSelector(messageImage);

  useEffect(() => {
    if (
      statusValue === 'success' &&
      sceneValue === 'uploadMessage' &&
      messageImageValue
    ) {
      dispatch(resetStatus());

      dispatch(resetMessageImage());

      props.handleSend(messageImageValue as Content, 2);

      return;
    }

    if (statusValue === 'failed' && sceneValue === 'uploadMessage') {
      dispatch(resetStatus());

      showError(store.getState().chatDetail.error);

      return;
    }
  }, [dispatch, props, sceneValue, statusValue, messageImageValue]);

  const uploadMessage = useCallback(
    (photo: Photo) => {
      checkFileExistence(photo)
        .then(result => {
          if (result) {
            dispatch(setScene('uploadMessage'));

            dispatch(uploadMessageAsync(photo));
          } else {
            showError(COULD_NOT_FIND_IMAGE);
          }
        })
        .catch(() => {
          showError(COULD_NOT_FIND_IMAGE);
        });
    },
    [dispatch],
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

  return (
    <View style={[styles.root, props.style]}>
      {btnList.map((value, index) => {
        const handlePress = () => {
          if (index === 4) {
            giftRef.current?.show();
          } else if (index === 1) {
            handleSelectPhoto();
          } else if (index === 2) {
            handleTakePhoto();
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
