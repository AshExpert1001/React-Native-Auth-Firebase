import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Home, Splash, CreateAccount, SignIn} from './Screens/Screens';

import * as firebase from 'firebase';
import {firebaseConfig} from './Config';
firebase.initializeApp(firebaseConfig);

const AuthStack = createStackNavigator();
const App = () => (
  <NavigationContainer>
  <AuthStack.Navigator initialRouteName="Splash">

    <AuthStack.Screen
      name="Splash"
      component={Splash}
      options={{ title: "Loading..." }}
    />
    
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />

    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
    
    <AuthStack.Screen
      name="Home"
      component={Home}
      options={{ title: "Home Screen" }}
    />

  </AuthStack.Navigator>
  </NavigationContainer>
);


export default App;

// class App extends Component{
//   render(){
//     return (
//       <View style={styles.container}>
//         <CreateAccount/>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
});
