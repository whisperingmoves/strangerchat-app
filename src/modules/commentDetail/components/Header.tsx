import React from 'react';
import {StyleSheet, View} from 'react-native';

import WarmUp from './WarmUp';
import ReportHint from './ReportHint';
import PostItem, {Props as PostItemProps} from '../../postItem/PostItem';
import {Gender} from '../../gender/store/slice';
import {UpdateListItemCallback} from '../../recommend/store/slice';

type Props = PostItemProps & {
  updateListItemCallback?: UpdateListItemCallback;
  focusInput: () => void;
};

export default (props: Props) => {
  return (
    <View style={styles.root}>
      <PostItem
        {...props}
        contentContainerStyle={styles.contentContainer}
        locationStyle={styles.location}
        footerStyle={styles.footer}
        focusInput={props.focusInput}
      />

      <WarmUp
        gender={props.authorGender as Gender}
        postId={props.postId}
        authorId={props.authorId}
      />

      <ReportHint style={styles.reportHint} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    gap: 16,
    marginBottom: 16,
  },
  contentContainer: {
    marginLeft: 0,
  },
  location: {
    marginTop: 10,
  },
  footer: {
    marginTop: 24,
  },
  reportHint: {
    marginTop: 6,
  },
});
