import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native';

import firebaseConfig from './Firebase';
import firebase from 'firebase';
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: '',
  };

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage });
    // alert("User Not Created")
  }

  handle_login = () => {
    const { email, password } = this.state;
    if (email == '' && password == '') {
      // alert('All Feilds Are required' )
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            this.onLoginFailure.bind(this)('Weak Password!');
          } else {
            this.onLoginFailure.bind(this)(errorMessage);
            console.log(errorMessage);
          }
        });
    }
  };

  onLoginSuccess() {
    const { name, email, password } = this.state;
    const currentUser = firebase.auth().currentUser;
    firebase
      .database()
      .ref('users/')
      .push({
        uid: currentUser.uid,
        name,
        email,
        profileImg: '',
        address: '',
        phoneNumber: '',
      })
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.navigation.navigate('Home');
    //alert("User Created")
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.textContainer}>CREATE ACCOUNT</Text>

        <View>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Name"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name: name })}
          />
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email: email })}
          />

          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password: password })}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.handle_login()}>
            <Text
              style={{
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 15,
              }}>
              {' '}
              Create Account{' '}
            </Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'Center', color: '#FF0000' }}>
            {this.state.error}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.textContainer}> Have an account? Sign In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: '10px',
    padding: '5px',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 30,
  },
  textInput: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  textContainer: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4a31ac',
    textAlign: 'center',
  },
});
