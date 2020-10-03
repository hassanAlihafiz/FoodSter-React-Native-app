import React from 'react'
import { View,Text,TouchableOpacity,TextInput,StyleSheet,StatusBar} from 'react-native'

import firebaseConfig from './Firebase'
import firebase from 'firebase'
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default class Login extends React.Component{
 
state={
  email:'',password:'',error:''
}

componentDidMount(){
firebase.auth().onAuthStateChanged((user)=>{
  if(user!=null){
    this.props.navigation.navigate("Home")
  }
})
}

handle_login=()=>{
const {email,password}=this.state
if(email=='' && password==''){
  this.setState({error:'All Feilds Are required'})
  // alert(this.state.error)

}else{
firebase.auth().signInWithEmailAndPassword(email,password).then(this.onLoginSuccess.bind(this))
      .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
              this.onLoginFailure.bind(this)('Weak Password!');
          } else {
               this.onLoginFailure.bind(this)(errorMessage);
              console.log(errorMessage)
          }
      });
}

}
onLoginSuccess() {
    this.props.navigation.navigate('Home');
//console.log("User Login")
  }
  onLoginFailure(errorMessage) {
   this.setState({ error: errorMessage});
    console.log(errorMessage)
  }

 render(){
return(
    <View style={styles.container}> 
    <StatusBar barStyle="light-content"></StatusBar>
    <Text style={styles.textContainer}>Login</Text>

<View>
  <TextInput style = {styles.textInput}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
value={this.state.email}
onChangeText={email=>this.setState({email:email})}
             />

               <TextInput style = {styles.textInput}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               value={this.state.password}
onChangeText={password=>this.setState({password:password})}
               />
               <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.handle_login()
               }>
               <Text style = {{color:"#FFF",fontWeight:'bold',textAlign:'center',fontSize:15}}> Submit </Text>
            </TouchableOpacity>
            
            <Text style={{textAlign:'Center',color:'#FF0000'}} >{this.state.error}</Text>
            
</View>

<TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
    <Text style={styles.textContainer}>Don't have an account? Sign Up</Text>
    </TouchableOpacity>
    </View>
  )
}
 }
  

const styles= StyleSheet.create({
  container:{
   justifyContent:'center',
    margin:'10px',
    padding:'5px'
  
  },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      borderRadius:30
   },
 textInput:{
   margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
 },
  textContainer:{
    fontSize:'20px',
    fontWeight:'bold',
  color:"#4a31ac",
  textAlign:'center'
  }
})