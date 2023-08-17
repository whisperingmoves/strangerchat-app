import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

import PlaceHolder from '../../../components/PlaceHolder';
import ShareButton from './ShareButton';
import CollectButton from './CollectButton';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import {CommentCount, LikeCount} from '../../following/store/slice';

type Props = {
  style: StyleProp<ViewStyle>;
  showCollect?: boolean;
  shareCount?: number;
  likeCount?: LikeCount;
  commentCount?: CommentCount;
};

export default (props: Props) => {
  // const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    Alert.alert("navigation.push('CommentDetail', {...props});");
  };

  return (
    <View style={[styles.footer, props.style]}>
      {!props.showCollect && <ShareButton />}

      {props.showCollect && <CollectButton />}

      <PlaceHolder />

      {props.showCollect && (
        <ShareButton count={props.shareCount} style={styles.likeBtn} />
      )}

      <LikeButton count={props.likeCount} style={styles.likeBtn} />

      <CommentButton
        style={styles.likeBtn}
        onPress={handlePress}
        count={props.commentCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBtn: {
    marginLeft: 26,
  },
});
