import React from 'react'
import {View,Text,SafeAreaView,TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
export default class Profile extends React.Component{
  render(){
    return(
    
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" color="#D8D90B" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Text
              style={{
                fontVariant: '700',
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#D8D90B',
              }}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.photo} onPress={() => this.pickImage()}>
          <Ionicons name="md-camera" size={32} color="#D8D90B" />
        </TouchableOpacity>
        <View style={styles.inputConatiner}>
          
          <TextInput
            autoFocus={true}
            multiline={true}
            styles={{ flex: 1,height:15 }}
            placeholder="Name"
          
          />
        </View>

        

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
       
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
    flexDirection: 'column-reverse',
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
