import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import icon_volume_up from '../../../assets/images/icons/icon_volume_up.png';
import icon_volume_down from '../../../assets/images/icons/icon_volume_down.png';
import {ImageSourcePropType} from 'react-native/Libraries/Image/Image';
import {
  Content,
  ContentLength,
  currentVoiceMessageId,
  MessageId,
  setCurrentVoiceMessageId,
} from '../store/slice';
import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player';
import {formatDuration} from '../../../utils/date';
import {LayoutChangeEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {showError} from '../../../utils/notification';

type VoiceMessageProps = {
  duration: ContentLength;
  messageId: MessageId;
  voiceUri: Content;
  containerStyle: StyleProp<ViewStyle>;
  isSelf?: boolean;
  durationTextStyle: StyleProp<TextStyle>;
};

export default (props: VoiceMessageProps) => {
  const [isStarted, setIsStarted] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [isResumed, setIsResumed] = useState(false);

  const [durationWidth, setDurationWidth] = useState(0);

  const currentVoiceMessageIdValue = useAppSelector(currentVoiceMessageId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      currentVoiceMessageIdValue &&
      currentVoiceMessageIdValue !== props.messageId
    ) {
      stopPlay().then();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVoiceMessageIdValue]);

  const isPlaying = useMemo(
    () => isStarted && !isPaused,
    [isPaused, isStarted],
  );

  const [icon, setIcon] = useState<ImageSourcePropType>(icon_volume_down);

  const audioRecorderPlayer: AudioRecorderPlayer = useMemo(
    () => new AudioRecorderPlayer(),
    [],
  );

  const handleStopPlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.stopPlayer();

    audioRecorderPlayer.removePlayBackListener();
  }, [audioRecorderPlayer]);

  const stopPlay = useCallback(async (): Promise<void> => {
    await handleStopPlay();

    setIsStarted(false);
    setIsPaused(false);
    setIsResumed(false);
  }, [handleStopPlay]);

  const handleStartPlay = useCallback(async (): Promise<void> => {
    dispatch(setCurrentVoiceMessageId(props.messageId));

    setTimeout(async () => {
      await audioRecorderPlayer.startPlayer(props.voiceUri);

      await audioRecorderPlayer.setVolume(1.0);

      audioRecorderPlayer.addPlayBackListener(async (e: PlayBackType) => {
        if (e.currentPosition >= e.duration) {
          await stopPlay();
        }
      });
    }, 200);
  }, [
    audioRecorderPlayer,
    dispatch,
    props.messageId,
    props.voiceUri,
    stopPlay,
  ]);

  const handlePausePlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.pausePlayer();
  }, [audioRecorderPlayer]);

  const handleResumePlay = useCallback(async (): Promise<void> => {
    await audioRecorderPlayer.resumePlayer();
  }, [audioRecorderPlayer]);

  const startPlay = useCallback(async (): Promise<void> => {
    if (!props.voiceUri) {
      return;
    }

    setIsStarted(true);
    setIsPaused(false);
    setIsResumed(false);

    await handleStartPlay();
  }, [handleStartPlay, props.voiceUri]);

  const pausePlay = useCallback(async (): Promise<void> => {
    await handlePausePlay();

    setIsPaused(true);
    setIsResumed(false);
  }, [handlePausePlay]);

  const resumePlay = useCallback(async (): Promise<void> => {
    await handleResumePlay();

    setIsResumed(true);
    setIsPaused(false);
  }, [handleResumePlay]);

  const togglePlay = useCallback(async () => {
    try {
      if (!isStarted) {
        await startPlay();

        return;
      }

      if (!isPaused) {
        await pausePlay();

        return;
      }

      if (!isResumed) {
        await resumePlay();

        return;
      }
    } catch (e) {
      await stopPlay();

      showError((e as Error).message);
    }
  }, [
    isPaused,
    isResumed,
    isStarted,
    pausePlay,
    resumePlay,
    startPlay,
    stopPlay,
  ]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      LayoutAnimation.easeInEaseOut();

      setIcon(icon_volume_up);

      intervalId = setInterval(() => {
        LayoutAnimation.easeInEaseOut();

        setIcon((prevIcon: ImageSourcePropType) => {
          return prevIcon === icon_volume_up
            ? icon_volume_down
            : icon_volume_up;
        });
      }, 500);
    } else {
      LayoutAnimation.easeInEaseOut();

      setIcon(icon_volume_down);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  const containerStyle = useMemo(() => {
    const containerWidth = 20 * 2 + 24 + durationWidth + props.duration * 5;

    return {
      width: containerWidth,
      flexDirection: props.isSelf ? 'row-reverse' : 'row',
    };
  }, [durationWidth, props.duration, props.isSelf]);

  const iconStyle = useMemo(() => {
    const rotateDegree = props.isSelf ? '180deg' : '0deg';

    return {
      tintColor: props.isSelf ? '#FFF' : '#554C5F',
      transform: [{rotate: rotateDegree}],
    };
  }, [props.isSelf]);

  const handleDurationLayout = useCallback((event: LayoutChangeEvent) => {
    setDurationWidth(event.nativeEvent.layout.width);
  }, []);

  return (
    <TouchableOpacity
      onPress={togglePlay}
      activeOpacity={0.7}
      style={[
        styles.container,
        containerStyle as ViewStyle,
        props.containerStyle,
      ]}>
      <Image source={icon} style={iconStyle} />

      <Text style={props.durationTextStyle} onLayout={handleDurationLayout}>
        {formatDuration(props.duration)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
