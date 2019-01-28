import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './Login';
import Profile from './Profile';

class App extends React.Component {
  render() {
    return (
      <Application />
    )
  }
}

const AppNavigator = createStackNavigator({
  Profile: { screen: Profile },
  Home: { screen: Login },
});

export default createAppContainer(AppNavigator);


// export default class App extends React.Component {
//   static navigationOptions = {
//     title: 'please sign in'
//   };

//   state = {
//     errorCode: null,
//   }

//   _signInAsync = async () => {
//     const { navigation } = this.props;
//     const redirectUrl = AuthSession.getRedirectUrl();
//     console.log(redirectUrl);
//     const result = await AuthSession.startAsync({
//       authUrl:
//         `${URL}${SF_OAUTH_URL}` +
//         `?response_type=token` +
//         `&client_id=${CLIENT_KEY}` +
//         `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
//     });
//     console.log(result);
//     const { type, errorCode = 'You cancel or dismissed the login' } = result;
//     if (type === 'success') {
//       // Just simple way to store the token in this examples
//       await AsyncStorage.setItem('userToken', JSON.stringify(result));
//       this.props.navigation.navigate('')
//     } else {
//       /**
//        * Result types can be: cancel, dismissed or error (with errorCode)
//        */
//       this.setState({ errorCode });
//     }
//   };

//   render() {
//     const { errorCode } = this.state;
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//         {errorCode ? <Text>{errorCode}</Text> : null}
//       </View>
//     );
//   }
// }

//   constructor(props) {
//     super(props)
//     this.state = {
//       signedIn: false,
//       name: "",
//       photoUrl: ""
//     }
//   }
//   signIn = async () => {
//     try {
//       fetch('192.168')

//       if (result.type === "success") {
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: result.user.photoUrl
//         })
//       } else {
//         console.log("cancelled")
//       }
//     } catch (e) {
//       console.log("error", e)
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.signedIn ? (
//           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//         ) : (
//           <LoginPage signIn={this.signIn} />
//         )}
//       </View>
//     )
//   }
// }

// const LoginPage = props => {
//   return (
//     <View>
//       <Text style={styles.header}>Sign In With Google</Text>
//       <Button title="Sign in with Google" onPress={() => props.signIn()} />
//     </View>
//   )
// }

// const LoggedInPage = props => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome:{props.name}</Text>
//     </View>
//   )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})