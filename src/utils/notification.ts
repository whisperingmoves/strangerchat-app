import Snackbar from 'react-native-snackbar';

export const showError = (errorMsg: string) => {
  Snackbar.dismiss();

  setTimeout(() => {
    Snackbar.show({
      text: errorMsg,
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#FF4288',
      backgroundColor: '#FFFFFF',
    });
  }, 50);
};
