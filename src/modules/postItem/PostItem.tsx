import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import Header from './components/Header';
import Location from './components/Location';
import Footer from './components/Footer';
import PhotoList from '../../components/PhotoList';
import {PostData} from '../../apis/post/getFollowedPosts';

type CustomProps = {
  isFollowing?: boolean;
  isRecommend?: boolean;
  isLatest?: boolean;
  showCollect?: boolean;
  contentContainerStyle?: ViewStyle;
  locationStyle?: ViewStyle;
  footerStyle?: ViewStyle;
};

type PostDetailProps = PostData;

export type Props = PostDetailProps & CustomProps;

export default (props: Props) => {
  let photoIsMarginLeft: boolean = true;
  if (
    props.contentContainerStyle &&
    props.contentContainerStyle.marginLeft === 0
  ) {
    photoIsMarginLeft = false;
  }

  return (
    <View style={styles.root}>
      <Header
        authorId={props.authorId}
        authorAvatar={props.authorAvatar}
        authorName={props.authorName}
        createTime={props.createTime}
        isFollowing={props.isFollowing}
        isRecommend={props.isRecommend}
        isLatest={props.isLatest}
        isFollowed={false}
        style={styles.header}
      />

      <View style={[styles.contentContainer, props.contentContainerStyle]}>
        {props?.images && (
          <PhotoList
            photoList={props.images}
            isMarginLeft={photoIsMarginLeft}
            style={styles.photoList}
          />
        )}

        {props?.content && <Text style={styles.content}>{props.content}</Text>}

        {props?.city && (
          <Location
            location={props.city}
            style={[styles.location, props.locationStyle]}
          />
        )}

        <Footer {...props} style={[styles.footer, props.footerStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  header: {
    marginBottom: 22,
  },
  contentContainer: {
    flex: 1,
    height: 'auto',
    marginLeft: 50 + 10,
  },
  photoList: {
    marginBottom: 14,
  },
  content: {
    color: '#554C5F',
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  location: {
    marginTop: 20,
  },
  footer: {
    marginTop: 26,
  },
});
