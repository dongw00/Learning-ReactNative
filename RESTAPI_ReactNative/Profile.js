import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar } from 'react-native';

const URL = 'http://192.168.0.3:3000';
//const ACC_TOKEN = 'xxx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posting: false,
      vin: '',
      manufacturer: '',
      model: '',
      year: ''
    }
  }

  render() {
    return (
      <View stlye={styles.container}>
        <StatusBar hidden={true} />
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
              placeholder="vin"
              onChangeText={(text) => {
                this.setState({
                  vin: text
                });
              }}
            />
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="manufacturer"
              onChangeText={(text) => {
                this.setState({
                  manufacturer: text
                });
              }}
            />
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="model"
              onChangeText={(text) => {
                this.setState({
                  model: text
                });
              }}
            />
            <TextInput
              style={{
                flex: 1,
                height: '100%',
              }}
              placeholder="year"
              onChangeText={(text) => {
                this.setState({
                  year: text
                });
              }}
            />
            <Button
            title="POST"
            onPress={this._postItem} />
          </View>
        ) : (
            <View style={styles.result}>
              <Text>vin : {this.state.vin}</Text>
              <Text>manufacturer : {this.state.manufacturer}</Text>
              <Text>model : {this.state.model}</Text>
              <Text>year : {this.state.year}</Text>
            </View>
          )}
      </View>
    )
  }

  _toggle = () => {
    this.setState({
      posting: true,
      vin: '',
      manufacturer: '',
      model: '',
      year: ''
    })
  }

  _getItem = () => {
    fetch(`${URL}/api/Vehicle`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          vin: data[0].vin,
          manufacturer: data[0].manufacturer,
          model: data[0].model,
          year: data[0].year
        })
      })
      .catch(error => {
        alert(`GET error!!!! ${error}`);
      })
  }

  _postItem = () => {
    const data = {
      "$class": "org.acme.vehicle.auction.Vehicle",
      "vin": this.state.vin,
      "manufacturer": this.state.manufacturer,
      "model": this.state.model,
      "year": this.state.year,
      "owner": "resource:org.acme.vehicle.auction.Member#6494"
    }
    console.log(data);
    fetch(`${URL}/api/Vehicle`, {
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
    marginTop: 45,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  marginR: {
    width: '95%',
    marginLeft: 13,
    marginTop: 15,
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
