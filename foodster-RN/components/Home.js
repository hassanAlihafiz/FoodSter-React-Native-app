import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Layout,
  FlatList,
} from 'react-native';
import firebaseConfig from './Firebase';
import firebase from 'firebase';
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
import { Ionicons } from '@expo/vector-icons';
import Search from './Search';
import AddPost from './AddPost';
import moment from 'moment'

const posts = [
  {
    id: '1',
    name: 'Hassan ALi',
    text: 'how r u',timestamp:1601667936312,
    avatar: require('../assets/snack-icon.png'),
    image:require('../assets/download.jpg')
  },
];

export default class Home extends React.Component {
  state = { user: {},post:{} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
        // console.log(this.state.user.uid)
      }
    });
this.unsubscribe = firebase.firestore().collection("posts").onSnapshot(this.getCollection);
  }

componentWillUnmount(){
  this.unsubscribe();
}
     getCollection = (querySnapshot) => {
  
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { uid,name,text,imageurl } = res.data();
      userArr.push({
        id: res.id,
        name,
        text,
        imageurl
      });
   
    });
    this.setState({
      post:JSON.stringify(userArr)
         });
   console.log(this.state.post)
  }

  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image style={styles.avatar} source={post.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
            </View>
            <Ionicons name="ios-more" size={24} color="#737888"/>
          </View>

          <Text style={styles.post}>{post.text}</Text>
<Image source={post.image} resizeMode="cover" style={styles.postImage}/>

<View style={{flexDirection:'row'}}>
   <Ionicons name="ios-heart-empty" size={24} color="#737888" style={{marginRight:16}}/>
      <Ionicons name="ios-chatboxes" size={24} color="#737888" style={{marginRight:16}}/>
</View>
        </View>
      </View>
    );
  };

  sign_out = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
          <TouchableOpacity onPress={this.sign_out}><Text>Sign out</Text></TouchableOpacity>
        </View>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFECF4',
  },
  header: {
    paddingTop: 54,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },post:{
    marginTop:16,
    fontSize:14,
    color:"#838899"
  },postImage:{
    width:undefined,height:150,
    borderRadius:5,
    marginVertical:16
  }
});
