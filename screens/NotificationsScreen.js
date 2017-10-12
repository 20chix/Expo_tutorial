import React from 'react';
import { ScrollView, StyleSheet, View , Alert} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { List, ListItem, Button } from 'react-native-elements';
import * as firebase from 'firebase';



export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  constructor(props) {
    super(props);

    this.state = {
      notification: {},
      userID: '',
      notificationsAvailable: [],
      error: ''

    };

  }

  componentDidMount() {
    let notificationPath = '/users/' + firebase.auth().currentUser.uid + '/notifications';
    firebase.database().ref(notificationPath).orderByKey().on('value', (snapshot) => {
      this.setState({
        notificationsAvailable: snapshot.val()
      });
    });

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          {
            Object.keys(this.state.notificationsAvailable).map((keys, i) => (
              <ListItem
                roundAvatar
                avatar={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                key={i}
                title={this.state.notificationsAvailable[keys].birthday}
              />
            ))
          }
        </List>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
