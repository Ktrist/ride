import React from 'react';
import { View,AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { connect } from 'react-redux';
  
  const ProfileMenuScreen = ({navigation,onSubmitToken}) => {
    return (

      <View style={{marginTop: 50}}>

        

        <ListItem bottomDivider onPress= {() => navigation.navigate('ArticleSell')}>
          <FontAwesome5 name="store" size={18} color="#009788" />
          <ListItem.Content>
            <ListItem.Title>My sales </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>



        <ListItem bottomDivider onPress= {() => navigation.navigate('WhishList')}>
          <FontAwesome name="heart" size={24} color="#009788" />
          <ListItem.Content>
            <ListItem.Title >My WishList</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => navigation.navigate('Search')}>
          <FontAwesome name="search" size={24} color="#009788" />
          <ListItem.Content>
            <ListItem.Title >Search</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => navigation.navigate('SignIn')}>
          <FontAwesome name="user" size={24} color="#009788" />
          <ListItem.Content>
            <ListItem.Title >Log In</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        
        <ListItem bottomDivider onPress= {() => navigation.navigate('SignUp')}>
          <AntDesign name="pluscircleo" size={24} color="#009788"  />
          <ListItem.Content>
            <ListItem.Title >Create an account</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem bottomDivider onPress= {() => {navigation.navigate('Log');AsyncStorage.removeItem("userToken");onSubmitToken()}}>
          <FontAwesome name="sign-out" size={24} color="#009788" />
          <ListItem.Content>
            <ListItem.Title >Log Out</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    );
  }

  function mapDispatchToProps(dispatch) {
    return {
      onSubmitToken: function (token) {
        dispatch({ type: 'informationFromLogOut', token:token})
      }
    }
  }

  export default connect(
  
    null,
    mapDispatchToProps
  
  )(ProfileMenuScreen);