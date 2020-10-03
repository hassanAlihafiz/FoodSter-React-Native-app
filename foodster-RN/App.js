import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'
import Register from './components/Register'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Ionicons} from '@expo/vector-icons'
import Home from './components/Home'
import Search from './components/Search'
import AddPost from './components/AddPost'
import MessageScreen from './components/MessageScreen'
import Profile from './components/Profile'

const Tab = createMaterialBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            }
             else if (route.name === 'Message') {
              iconName = focused ? 'ios-chatboxes' : 'ios-chatboxes';
            }
             else if (route.name === 'AddPost') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle';
            }else if(route.name==='Search'){
                iconName = focused ? 'ios-notifications' : 'ios-notifications';
            }

else if(route.name==='Profile'){
                iconName = focused ? 'ios-person' : 'ios-person';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
            <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Message" component={MessageScreen} />
            <Tab.Screen name="AddPost" component={AddPost}   />
             <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={MyTabs} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
