import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';

const URL = 'http://192.168.25.56:3000/'
const SF_OAUTH_URL = 'auth/github/callback';
const CLIENT_KEY = '0b660c51e02ff09b2175'

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };

  state = {
    errorCode: null,
  }

  _signInAsync = async () => {
    const { navigation } = this.props;
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    const result = await AuthSession.startAsync({
      authUrl:
        `${URL}${SF_OAUTH_URL}` +
        `?response_type=token` +
        `&client_id=${CLIENT_KEY}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    const { type, errorCode = 'You cancel or dismissed the login' } = result;
    if (type === 'success') {
      await AsyncStorage.setItem('userToken', JSON.stringify(result));
      navigation.navigate('Profile');
    } else {
      this.setState({ errorCode });
      alert(this.state.errorCode);
    }
  };

  render() {
    const { errorCode } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
        {errorCode ? <Text>{errorCode}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  }
})