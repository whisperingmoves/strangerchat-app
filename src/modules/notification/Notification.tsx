import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import NavigationBar from './components/NavigationBar';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DetailHeader from '../../components/DetailHeader';
import {NOTIFICATION} from '../../constants/notification/Config';

export default () => {
  const insets = useSafeAreaInsets();

  const statusBarStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.root, statusBarStyle]}>
      <DetailHeader
        style={styles.header}
        title={NOTIFICATION}
        onBackPress={handleBackPress}
        hideMore={true}
      />

      <NavigationBar style={styles.navigationBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    marginTop: 12,
  },
  guide: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  navigationBar: {
    marginTop: 36,
  },
});
