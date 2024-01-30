// Copyright (C) 2024  whisperingmoves(舞动轻语) <whisperingmoves@126.com>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
