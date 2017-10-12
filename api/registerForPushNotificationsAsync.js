import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';



firebase.initializeApp({
  apiKey: "AIzaSyA6NTJJYJk70RTlVygW4fASKDTM5vXmHoI",
  authDomain: "login-app-b7f89.firebaseapp.com",
  databaseURL: "https://login-app-b7f89.firebaseio.com",
  projectId: "login-app-b7f89",
  storageBucket: "login-app-b7f89.appspot.com",
  messagingSenderId: "944163924283"
});


export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();



  userID = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userID).update({ token: token });



  // // POST the token to our backend so we can use it to send pushes from there
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //   }),
  // });
});
