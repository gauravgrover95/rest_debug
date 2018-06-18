import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Linking,
} from 'react-native';

export default class Screen extends Component {

    state = {
        // this object contains aut_code and state
        accessToken: "",
    }

    static navigationOptions = { // A
        title: 'Screen',
    };

    getAccessToken = (obj) => {
        // Warn User
        console.log('fetching access token');
        
        var details = {
            'client_id': '22CQ3D',
            'grant_type': 'authorization_code',
            'redirect_uri': 'apifitbit://callback/1',
            'code': obj.code,
            'state': obj.state,
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const res = fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic MjJDUTNEOjVjMmIyNWY4NzQ1NWY5OTBjZjNhZDg5NDg2NWIyMzc1',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            /**
             * Place your logic to save the access token here
             */
            console.log("access token", responseJson);
            this.setState({ 
                accessToken: responseJson.access_token,
            });
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    componentDidMount() { // B
        // Constructor to generate access token
        const { name, url, obj } = this.props.navigation.state.params;
        if(!this.state.accessToken) {
            this.getAccessToken(obj);
        }
    }
    
    profile = () => {
        // GET https://api.fitbit.com/1/user/-/profile.json
        // Authorization: Bearer <access_token>
        const res = fetch('https://api.fitbit.com/1/user/6CJ7PX/profile.json', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.state.accessToken,
            },
        })
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    activity = () => {
        // GET https://api.fitbit.com/1/user/[user-id]/activities/date/[date].json
        const res = fetch('https://api.fitbit.com/1/user/6CJ7PX/activities/date/today.json', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.state.accessToken,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    sleep = () => {
        // GET https://api.fitbit.com/1.2/user/[user-id]/sleep/date/[date].json
        const res = fetch('https://api.fitbit.com/1.2/user/6CJ7PX/sleep/date/today.json', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.state.accessToken,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btn}>
                    <Button title="Profile" onPress={this.profile} />
                    <Button title="Activity" onPress={this.activity} />
                    <Button title="Sleep" onPress={this.sleep} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 80,
    },
    btn: {
        height: 200,
        justifyContent: 'space-around',
    }
});