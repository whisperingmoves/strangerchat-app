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

export const showSuccess = (successMsg: string) => {
  Snackbar.dismiss();

  setTimeout(() => {
    Snackbar.show({
      text: successMsg,
      duration: Snackbar.LENGTH_SHORT,
      textColor: '#FFF',
      backgroundColor: '#8B5CFF',
    });
  }, 50);
};
