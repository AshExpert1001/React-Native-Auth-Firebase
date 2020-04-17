import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity,ActivityIndicator, Alert } from "react-native";
import { TextInput } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from 'firebase';

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export class Home extends Component{
  state={
    email:""
  }
  componentDidMount(){
    this.unSuscribeAuth = firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({
          email:user.email
        })
      }else{
        this.props.navigation.navigate('SignIn')
      }
    })
  }
  componentWillUnmount(){
    this.unSuscribeAuth()
  }
  SingOut(){
    firebase.auth().signOut()
    .catch(error=>{
      Alert.alert(error.message)
    })
  }
  
  render(){
    return (
      <ScreenContainer>
        <View style={styles.logoView}>
        <View style={styles.logo} />
        </View> 
        <Text style={{fontSize:25, margin:20,textAlign:'center'}}>SignIn as {this.state.email}</Text>
        <Button title="LogOut" onPress={()=>{this.SingOut()}}/>
      </ScreenContainer>
    );
  }
}


export class Splash extends Component{
  componentDidMount(){
    this.unSuscribeAuth = firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.props.navigation.navigate('Home')
      }else{
        this.props.navigation.navigate('SignIn')
      }
    })
  }
  componentWillUnmount(){
    this.unSuscribeAuth()
  }
  render(){
    return (
      <ScreenContainer>
        <ActivityIndicator size="large" color="black" />
      </ScreenContainer>
    );
  }
} 

export class SignIn extends Component{
    state={
        email:"",
        password:''
    }
    userSignIn(email, pass){
      console.log(this.state)
      firebase.auth().signInWithEmailAndPassword(email,pass)
      .then(()=>{
        this.props.navigation.navigate('Home')
      })
      .catch(error=>{
        Alert.alert(error.message)
      })
  } 
   render(){
      return (
    <ScreenContainer>
      <View style={styles.logoView}>
      <View style={styles.logo} />
      </View>  
      <ScrollView>
      <TextInput
        style={styles.input}
        label='Enter Email'
        value={this.state.email}
        onChangeText={text => this.setState({email:text})}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        label='Enter Password'
        value={this.state.password}
        onChangeText={text => this.setState({ password:text })}
      />

      <Button
        title="SignIn"
        onPress={()=>this.userSignIn(this.state.email, this.state.password)}
      />
    <TouchableOpacity
        style={styles.touch}
        onPress={() => this.props.navigation.navigate("CreateAccount")}
    >
     <Text>Create Account</Text>
    </TouchableOpacity>

    </ScrollView>
    </ScreenContainer>
  ); 
 }
};

export class CreateAccount extends Component{
    state={
      email:"",
      Password:'',
      Cpass:""  
    }
    userNewAccount(email, pass, cpass){
      firebase.auth().createUserWithEmailAndPassword(email,cpass)
      .then(()=>{
        this.props.navigation.replace('SignIn')
      })
      .catch(error=>{
        Alert.alert(error.message)
      })
  } 
    
    render(){
        return (
      <ScreenContainer>
      <View style={styles.logoView}>
      <View style={styles.logo}/>
      </View>  
    <ScrollView>
      <TextInput
        style={styles.input}
        label='Enter Email'
        value={this.state.email}
        onChangeText={text => this.setState({ email:text })}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        label='Choose Password'
        value={this.state.password}
        onChangeText={text => this.setState({ password:text })}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        label='Confirm Password'
        value={this.state.Cpass}
        onChangeText={text => this.setState({ Cpass:text })}
      />
      <Button
        title="Submit"
        onPress={()=>this.userNewAccount(this.state.email,this.state.Password,this.state.Cpass)}
      />
    <TouchableOpacity
        style={styles.touch}
        onPress={()=>this.props.navigation.goBack()}
    >
     <Text>Already have an account</Text>
    </TouchableOpacity>
    </ScrollView>
    </ScreenContainer>
  );
 }  
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:20
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    },
    input:{
        marginBottom:15,
        padding:2,
        
    },
    logoView:{justifyContent:"center", alignItems:'center'},
    logo:{ width:120,height:120,borderRadius:60,backgroundColor:'#d3d3d3', margin:20 },
    touch:{alignItems:'center',marginTop:20}
  });