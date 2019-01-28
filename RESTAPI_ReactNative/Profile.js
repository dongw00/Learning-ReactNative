import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const URL = 'http://192.168.25.56:3000';
//const ACC_TOKEN = 'xxx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false,
      tradeId: '',
      firstName: '',
      lastName: ''
    }
  }

  render() {
    return (
      <View stlye={styles.container}>
        <Text style={styles.text}>Welcome to React world!</Text>
        <Text style={styles.subTitle}>😀Composer REST API TEST😀</Text>
        <View style={styles.contentBox}>
          <Button
            title="GET Item"
            onPress={this._getItem} />
          <Button
            title="Let's posting"
            onPress={this._toggle} />
        </View>
        {this.state.posting ? (
          <View style={[styles.marginR, styles.inputContainer]}>
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="tradeId"
              onChangeText={(text) => {
                this.setState({
                  tradeId: text
                });
              }}
            />
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="firstName"
              onChangeText={(text) => {
                this.setState({
                  firstName: text
                });
              }}
            />
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="lastName"
              onChangeText={(text) => {
                this.setState({
                  lastName: text
                });
              }}
            />
            <Button
            title="POST"
            onPress={this._postItem} />
          </View>
        ) : (
            <View style={styles.result}>
              <Text>tradeId : {this.state.tradeId}</Text>
              <Text>firstName : {this.state.firstName}</Text>
              <Text>lastName : {this.state.lastName}</Text>
            </View>
          )}
      </View>
    )
  }

  _toggle = () => {
    this.setState({
      posting: true,
      tradeId: '',
      firstName: '',
      lastName: ''
    })
  }

  _getItem = () => {
    fetch(`${URL}/api/Trader?access_token=${ACC_TOKEN}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          tradeId: data[0].tradeId,
          firstName: data[0].firstName,
          lastName: data[0].lastName
        })
      })
      .catch(error => {
        alert(`GET error!!!! ${error}`);
      })
  }

  _postItem = () => {
    const data = {
      "$class": "org.example.trading.Trader",
      "tradeId": this.state.tradeId,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }
    console.log(data);
    fetch(`${URL}/api/Trader`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(result => console.log(`POST result: ${result}`))
      .catch(error => {
        alert(`POST error!!!! ${error}`);
      })
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '300',
    marginTop: 22,
    color: '#000',
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
  textInput: {
    flex: 1,
    height: '100%',
  },
  result: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  marginR: {
    marginTop: 10
  },
  inputContainer: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  }
})
