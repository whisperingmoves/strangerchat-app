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
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import icon_delete from '../../assets/images/icons/icon_delete.png';

type Props = {
  onRequestClose: () => void;
  onDelete?: (imageIndex: number) => void;
  imageIndex: number;
};

const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};

const ImageHeader = ({onDelete, onRequestClose, imageIndex}: Props) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(imageIndex);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.space} />

        {onDelete && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleDelete}
            hitSlop={HIT_SLOP}
            activeOpacity={0.7}>
            <Image source={icon_delete} style={styles.deleteImage} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={onRequestClose}
          hitSlop={HIT_SLOP}
          activeOpacity={0.7}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#00000077',
  },
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  space: {
    width: 45,
    height: 45,
  },
  closeButton: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    lineHeight: 25,
    fontSize: 25,
    paddingTop: 2,
    includeFontPadding: false,
    color: '#FFF',
  },
  deleteImage: {
    tintColor: '#FFF',
    resizeMode: 'cover',
  },
  text: {
    maxWidth: 240,
    marginTop: 12,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 17,
    color: '#FFF',
  },
});

export default ImageHeader;
