import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOK_LOGIN_SUCCESS,
  FACEBOK_LOGIN_FAIL
} from './types';

// AsynsStorage.setItem('fb_token', token);
// AsynsStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  console.log('token : '+token);
  if (token) {
    // Dispatch an action saying FB login done
    dispatch({ type: FACEBOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token} = await Facebook.logInWithReadPermissionsAsync('167630180401785', {
    permissions: ['public_profile']
  });
  if (type == 'cancel') {
    return dispatch({ type: FACEBOK_LOGIN_FAIL })
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOK_LOGIN_SUCCESS, payload: token });
};
