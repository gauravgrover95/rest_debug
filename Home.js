import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Linking,
} from 'react-native';

import { authorize } from 'react-native-app-auth';

const config = {
    clientId: '22CQ3D',
    clientSecret: '5c2b25f87455f990cf3ad894865b2375',
    redirectUrl: 'apifitbit://callback', //note: path is required
    scopes: ['activity', 'sleep', 'profile'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
        // authorizationEndpoint: 'http://10.5.50.136:8000',
        tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
        revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
    }
};


export default class Home extends Component {
    static navigationOptions = { // A
        title: 'Home',
    };

    ModifiedNavigate = (url) => { // E

        console.log("ModifiedNavigate() was called");
        
        // object contain the auth_code and state
        let obj = {};
        
        // Parsing parameters in the url received
        url.split("?")[1].split("&").forEach((part) => {
            const temp = part.split("=");
            obj[temp[0]] = temp[1];
        });
        
        console.log("OBJ", obj);
        console.log("URL", url);

        const route = url.replace(/.*?:\/\//g, '');
        console.log("route", route);

        const id = route.match(/\/([^\/]+)\/?$/)[1];
        console.log("id", id);
        
        const routeName = route.split('/')[0];
        console.log("routeName", routeName);

        if (routeName === 'callback') {
            this.props.navigation.navigate('Screen', {
                'name': 'Gaurav',
                'url': url,
                'obj': obj,
            });
        };
    }

    componentDidMount() { // B
        console.log("componentDidMount() was called");
        // This simply calls ModifiedNavigate function
        // which further parse the url and redirects
        Linking.getInitialURL().then(url => {
            this.ModifiedNavigate(url);
        });
    }

    login = async () => {
        console.log("login() was called");
        try {
            const result = await authorize(config);
            console.log("result", result);
        } catch (error) {
            console.log(error);
        }
    }

    navigateToScreen = () => {
        this.props.navigation.navigate('Screen', {"name": "Shelly"})
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Fitbit Login" onPress={this.login} />
                <Button title="Navigate" onPress={this.navigateToScreen} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
