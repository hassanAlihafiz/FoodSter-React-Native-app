import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import firebaseConfig from './Firebase'
// import firebase from 'firebase'
// if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
import Constant from 'expo-constants';
import Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from './Fire';
const firebase = require('firebase');
require('firebase/firestore');
export default class AddPost extends React.Component {
  state = {
    text: '',
    imageUrl: null,
  };
  componentDidMount() {
    this.getPermission();
  }
  getPermission = async () => {
    if (Constant.platform.ios) {
      const { status } = await Permissions.Ask
      if (status == 'granted') alert('Permission Granted');
    } 
  };
  handle_post = () => {
  firebase.firestore().collection("posts").add({
    text:this.state.text,
    uid:firebase.auth().currentUser.uid,
    timestamp:Date.now(),
    imageUrl:this.state.imageUrl
  }).then(res=>{
    this.setState({ text: '', imageUrl: null });
   this.props.navigation.goBack()
   })
   .catch(err=>{
     alert(err)
   })
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: (4, 3),
    });
    if (!result.cancelled) {
      this.setState({ imageUrl: result.uri });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" color="#D8D90B" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handle_post}>
            <Text
              style={{
                fontVariant: '700',
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#D8D90B',
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputConatiner}>
          <Image
            source={require('../assets/snack-icon.png')}
            style={styles.avatar}
          />
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            styles={{ flex: 1 }}
            placeholder="Want to share something"
            onChangeText={(text) => this.setState({ text: text })}
            value={this.state.text}
          />
        </View>

        <TouchableOpacity style={styles.photo} onPress={() => this.pickImage()}>
          <Ionicons name="md-camera" size={32} color="#D8D90B" />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D90B',
  },
  inputConatiner: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});
