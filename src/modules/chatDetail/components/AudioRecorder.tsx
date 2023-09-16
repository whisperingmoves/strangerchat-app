import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import Button from './Button';
import {
  ALLOW_ACCESS_MICROPHONE,
  ALLOW_ACCESS_STORAGE,
} from '../../../constants/Config';
import {
  checkAudioRecordPermission,
  openSettings,
} from '../../../utils/permission';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';

export interface AudioRecorderRef {
  show: () => void;
  hide: () => void;
}

const screenWidth = Dimensions.get('screen').width;

type Props = {
  onConfirm: (audioUri: string, recordSecs: number) => void;
  onCancel: () => void;
};

export default forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false);

  const [recordMilliSecs, setRecordMilliSecs] = useState(0);

  const [recordTime, setRecordTime] = useState('00:00:00');

  const [currentPositionSec, setCurrentPositionSec] = useState(0);

  const [currentDurationSec, setCurrentDurationSec] = useState(0);

  const [playTime, setPlayTime] = useState('00:00:00');

  const [duration, setDuration] = useState('00:00:00');

  const [audioUri, setAudioUri] = useState('');

  const [isRecording, setIsRecording] = useState(false);

  const [isRecordPaused, setIsRecordPaused] = useState(true);

  const [isRecordResumed, setIsRecordResumed] = useState(true);

  const [isRecordStopped, setIsRecordStopped] = useState(true);

  const [isHistoryRecordStopped, setIsHistoryRecordStopped] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);

  const [isPlayPaused, setIsPlayPaused] = useState(true);

  const [isPlayResumed, setIsPlayResumed] = useState(true);

  const [isPlayStopped, setIsPlayStopped] = useState(true);

  const path = Platform.select({
    ios: undefined,
    android: undefined,
  });

  const audioRecorderPlayer: AudioRecorderPlayer = useMemo(
    () => new AudioRecorderPlayer(),
    [],
  );

  audioRecorderPlayer.setSubscriptionDuration(0.1).then();

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  const playWidth = currentDurationSec
    ? (currentPositionSec / currentDurationSec) * (screenWidth - 56)
    : 0;

  const handleStatusPress = useCallback(
    (e: any): void => {
      const touchX = e.nativeEvent.locationX;

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const playWidth =
        (currentPositionSec / currentDurationSec) * (screenWidth - 56);

      const currentPosition = Math.round(currentPositionSec);

      if (playWidth && playWidth < touchX) {
        const addSecs = Math.round(currentPosition + 1000);

        audioRecorderPlayer.seekToPlayer(addSecs).then();
      } else {
        const subSecs = Math.round(currentPosition - 1000);

        audioRecorderPlayer.seekToPlayer(subSecs).then();
      }
    },
    [audioRecorderPlayer, currentDurationSec, currentPositionSec],
  );

  const handleStartRecord = useCallback(async () => {
    const permissionStatusMap = await checkAudioRecordPermission();

    if (
      Platform.OS === 'android' &&
      Number(Platform.Version) < 33 &&
      (permissionStatusMap[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] !==
        RESULTS.GRANTED ||
        permissionStatusMap[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !==
          RESULTS.GRANTED ||
        permissionStatusMap[PERMISSIONS.ANDROID.RECORD_AUDIO] !==
          RESULTS.GRANTED)
    ) {
      openSettings(ALLOW_ACCESS_STORAGE);

      return;
    } else if (
      Platform.OS === 'android' &&
      Number(Platform.Version) >= 33 &&
      permissionStatusMap[PERMISSIONS.ANDROID.RECORD_AUDIO] !== RESULTS.GRANTED
    ) {
      openSettings(ALLOW_ACCESS_MICROPHONE);

      return;
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    const ret = await audioRecorderPlayer.startRecorder(path, audioSet);

    if (ret !== 'Already recording') {
      setAudioUri(ret);
    }

    audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      setRecordMilliSecs(e.currentPosition);

      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });

    LayoutAnimation.easeInEaseOut();

    setIsRecording(true);
    setIsRecordPaused(false);
    setIsRecordStopped(false);
  }, [audioRecorderPlayer, path]);

  const handlePauseRecord = useCallback(async () => {
    await audioRecorderPlayer.pauseRecorder();

    LayoutAnimation.easeInEaseOut();

    setIsRecordPaused(true);
    setIsRecordResumed(false);
  }, [audioRecorderPlayer]);

  const handleResumeRecord = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.resumeRecorder();

    LayoutAnimation.easeInEaseOut();

    setIsRecordResumed(true);
    setIsRecordPaused(false);
  }, [audioRecorderPlayer]);

  const handleStopRecord = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();

    LayoutAnimation.easeInEaseOut();

    setIsRecordStopped(true);
    setIsHistoryRecordStopped(true);
    setIsRecording(false);
    setIsRecordPaused(true);
    setIsRecordResumed(true);
    setIsPlaying(false);
  }, [audioRecorderPlayer]);

  const handleStartPlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.startPlayer(path);

    await audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
      setCurrentPositionSec(e.currentPosition);

      setCurrentDurationSec(e.duration);

      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));

      if (e.currentPosition >= e.duration) {
        LayoutAnimation.easeInEaseOut();

        setIsPlayStopped(true);
        setIsPlaying(false);
        setIsPlayPaused(true);
        setIsPlayResumed(true);
      }
    });

    LayoutAnimation.easeInEaseOut();

    setIsPlaying(true);
    setIsPlayPaused(false);
    setIsPlayStopped(false);
  }, [audioRecorderPlayer, path]);

  const handlePausePlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();

    LayoutAnimation.easeInEaseOut();

    setIsPlayPaused(true);
    setIsPlayResumed(false);
  }, [audioRecorderPlayer]);

  const handleResumePlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.resumePlayer();

    LayoutAnimation.easeInEaseOut();

    setIsPlayResumed(true);
    setIsPlayPaused(false);
  }, [audioRecorderPlayer]);

  const handleStopPlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.stopPlayer();

    audioRecorderPlayer.removePlayBackListener();

    LayoutAnimation.easeInEaseOut();

    setIsPlayStopped(true);
    setIsPlaying(false);
    setIsPlayPaused(true);
    setIsPlayResumed(true);
  }, [audioRecorderPlayer]);

  const handleConfirm = useCallback(() => {
    props.onConfirm(audioUri, Math.floor(recordMilliSecs / 1000));
  }, [audioUri, props, recordMilliSecs]);

  const handleCancel = useCallback(async () => {
    if (isPlaying) {
      await handlePausePlay();
    }

    if (isRecording) {
      await handlePauseRecord();
    }

    props.onCancel();
  }, [handlePausePlay, handlePauseRecord, isPlaying, isRecording, props]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={hide}
      animationType={'fade'}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.txtRecordCounter}>{recordTime}</Text>

        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={[styles.btn, isRecording ? styles.disabledBtn : {}]}
              onPress={handleStartRecord}
              textStyle={styles.txt}
              disabled={isRecording}>
              Record
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isRecordPaused ? styles.disabledBtn : {},
              ]}
              onPress={handlePauseRecord}
              textStyle={styles.txt}
              disabled={isRecordPaused}>
              Pause
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isRecordResumed ? styles.disabledBtn : {},
              ]}
              onPress={handleResumeRecord}
              textStyle={styles.txt}
              disabled={isRecordResumed}>
              Resume
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isRecordStopped ? styles.disabledBtn : {},
              ]}
              onPress={handleStopRecord}
              textStyle={styles.txt}
              disabled={isRecordStopped}>
              Stop
            </Button>
          </View>
        </View>

        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={handleStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>

          <Text style={styles.txtCounter}>
            {playTime} / {duration}
          </Text>

          <View style={styles.playBtnWrapper}>
            <Button
              style={[styles.btn, isPlaying ? styles.disabledBtn : {}]}
              onPress={handleStartPlay}
              textStyle={styles.txt}
              disabled={isPlaying}>
              Play
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isPlayPaused ? styles.disabledBtn : {},
              ]}
              onPress={handlePausePlay}
              textStyle={styles.txt}
              disabled={isPlayPaused}>
              Pause
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isPlayResumed ? styles.disabledBtn : {},
              ]}
              onPress={handleResumePlay}
              textStyle={styles.txt}
              disabled={isPlayResumed}>
              Resume
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
                isPlayStopped ? styles.disabledBtn : {},
              ]}
              onPress={handleStopPlay}
              textStyle={styles.txt}
              disabled={isPlayStopped}>
              Stop
            </Button>
          </View>
        </View>

        <View style={styles.viewPlayer}>
          <View style={styles.playBtnWrapper}>
            <Button
              style={[
                styles.btn,
                !isHistoryRecordStopped ? styles.disabledBtn : {},
              ]}
              onPress={handleConfirm}
              textStyle={styles.txt}
              disabled={!isHistoryRecordStopped}>
              Confirm
            </Button>

            <Button
              style={[
                styles.btn,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  marginLeft: 12,
                },
              ]}
              onPress={handleCancel}
              textStyle={styles.txt}>
              Cancel
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
});

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000B2',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
  disabledBtn: {
    opacity: 0.2,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    letterSpacing: 3,
  },
});
