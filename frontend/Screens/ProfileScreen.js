import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {IP_HOST} from '../variable'

const ProfileScreen = ({ navigation, takeToken }) => {

  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const findUser = async () => {
      const rawData = await fetch(`http://${IP_HOST}:3000/users/display-profile?token=${takeToken}`)
      const doneData = await rawData.json()
      setUserInfo(doneData)
    }
    findUser()
  }, [])

  //INOFRMATION ISSUES DE LA BASE DE DONNÉES

  let myProfil;

  if(userInfo != null) {
    
    myProfil =  <View>

    <View style={{ flexDirection: 'column', width: '95%', marginBottom: 20 }}>


      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Nom:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.lastName}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Prénom:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.firstName}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Email:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.email}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Adresse:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.address}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Code Postal:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.postalCode}</Text>
      </View>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <Text style={{ fontSize: 17, width: 110 }}>Ville:</Text>
        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 17 }}>{userInfo.city}</Text>
      </View>

    </View>

    <Button title="Update my personnal informations" buttonStyle={{ backgroundColor: "#82589F" }} type="solid" onPress={() => navigation.navigate('ProfileUp')} />

  </View>

  } else {
    myProfil = <View style={{ flex: 1, marginTop: 10, width: '95%', marginLeft: 10 }}>
    <Text style={{textAlign:"center", marginBottom:30}}>You're not connected</Text>
    <Button title="Please log in" buttonStyle={{backgroundColor: "#82589F"}} type="solid"
            onPress={()=> {navigation.navigate('SignIn')}}/>
    </View>
  }


  return (

    <View style={{ flex: 1, marginTop: 50, width: '95%', marginLeft: 10 }}>

      <View style={{flexDirection:'row', width:'100%'}}>
        <FontAwesome name="long-arrow-left" size={24} color="#82589F" style={{marginTop:5}} onPress={() => navigation.goBack()}/>
        <Text style={{ fontSize:20, marginTop: 5, marginLeft:40}}>My personnal informations</Text>
      </View>
      <View style={{ backgroundColor: '#D7DBDD', height: 1, width: 300, marginLeft: 50, marginTop: 20, marginBottom: 30 }}></View>

     {myProfil} 
      
    </View>

  );
}

function mapStateToProps(state) {
  return { takeToken: state.token }
}


export default connect(

  mapStateToProps,
  null

)(ProfileScreen);

