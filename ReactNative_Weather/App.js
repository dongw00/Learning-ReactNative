import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Weather from './Weather';

const API_KEY = '7607d38e1a6f76ce576412dbbeb37bb6';

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this._getWeather(pos.coords.latitude, pos.coords.longitude);
      },
      err => {
        this.setState({
          error: err,
        });
      }
    );
  }

  _getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          city: json.name,
          isLoaded: true,
        });
        console.log(json.weather[0].main);
      });
  };

  render() {
    const { isLoaded, error, name, temperature, city } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather
            weatherName="Snow"
            temp={Math.floor(temperature - 273.15)}
            city={city}
          />
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>로딩중...</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FEF253',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 35,
    marginBottom: 100,
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent',
    marginBottom: 40,
  },
});
