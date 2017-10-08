import React from 'react';
import { View, Button, Text } from 'react-native'
import * as firebase from 'firebase';
import MainTaNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements'

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: 'Test@test.com', password: '123456', error: '', loading: false };
    }
    onLoginPress() {
        
        this.setState({ error: '', loading: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');

            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false });

            })

    }

    onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');

            })
            .catch(() => {
                this.setState({ error: 'Authentication failed', loading: false });

            })
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text> Loading </Text>
        }
        return <View>
            <Button
                onPress={this.onLoginPress.bind(this)}
                title='Login'/>
            <Button
                onPress={this.onSignUpPress.bind(this)}
                title='Sign up'/>

        </View>

    }
    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                 value = {this.state.email} 
                 onChangeText={email => this.setState({ email })}
                 placeholder='john@icloud.com'
                 />
                <FormLabel>Password</FormLabel>
                <FormInput 
                value = {this.state.password}
                secureTextEntry
                placeholder='*******'
                onChangeText={password => this.setState({ password })}
                />
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}

            </View>

        )

    }


}