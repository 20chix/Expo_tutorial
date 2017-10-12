import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, ListView, Platform } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import * as firebase from 'firebase';
import { List, ListItem, Button } from 'react-native-elements';
import Expo from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props) {
    super(props);

    this.state = {
      notification: {},
      userID: '',
      notificationsAvailable: [],
      error: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: () => false,
        sectionHeaderHasChanged: () => false,
      }),
    };
  }
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
   // this._clearIconBadgeAsync();  
  }
  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  
    
  }

  // //use later for push notification description
  render() {
    return (
      <View>

        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>

    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = (notification) => {
    this.userID = firebase.auth().currentUser.uid;
    this.props.navigation.navigate('Notifications');
    this.setState({ notification: notification });

    firebase.database().ref('users/' + this.userID + '/notifications').push(notification.data);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});



