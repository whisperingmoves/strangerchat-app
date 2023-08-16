import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

type Props = {
  visible: boolean;
};

export default (props: Props) => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.root}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
