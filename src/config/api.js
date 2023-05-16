// // import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import axios from 'axios';
// import {authorize} from 'react-native-app-auth';

// // GoogleSignin.configure({
// //   scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
// //   webClientId:
// //     '1009170810242-8en44ril97tobrii28b24vj8mh6lkl37.apps.googleusercontent.com',
// // });
// const config = {
//   issuer: 'https://accounts.google.com',
//   clientId:
//     '1009170810242-8en44ril97tobrii28b24vj8mh6lkl37.apps.googleusercontent.com',
//   redirectUrl: 'ingenkart-auth',
//   scopes: ['profile'],
// };
// // Log in to get an authentication token
// export const authState = async () => {
//   //   const {idToken} = await GoogleSignin.signIn();
//   //   console.log(idToken);
//   //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//   //   const {user, additionalUserInfo} = await auth().signInWithCredential(
//   //     googleCredential,
//   //   );
//   //   //   console.log(JSON.stringify({user, additionalUserInfo}, null, 4));
//   //   //   console.log(auth().currentUser);
//   //   const token = (await auth().currentUser.getIdTokenResult()).token;
//   //   console.log('token: ', token);
//   //   //   Create a Google credential with the token
//   //   // const response = await axios
//   //   //   .get('https://www.googleapis.com/youtube/v3/channels', {
//   //   //     params: {
//   //   //       part: 'snippet',
//   //   //       mine: true,
//   //   //     },
//   //   //     headers: {
//   //   //       Authorization: 'Bearer ' + idToken,
//   //   //     },
//   //   //   })
//   //   //   .catch(err => console.log(err));
//   //   //   return response;
//   const result = await authorize(config);
//   const accessToken = result.accessToken;
//   console.log(accessToken);
// };

// // Refresh token
// export const logout = async () => {
//   try {
//     await GoogleSignin.signOut();
//     // Remember to remove the user from your app's state as well
//   } catch (error) {
//     console.error(error);
//   }
// };
// // Revoke token
// export const revoke = async () => {
//   try {
//     await GoogleSignin.revokeAccess();
//     await GoogleSignin.signOut();
//   } catch (error) {
//     console.error(error);
//   }
// };
