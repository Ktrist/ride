import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'


function SignUpScreens({ onSubmitToken, navigation, typeOfAction }) {
  
  const [gender, setGender] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumb, setPhoneNumb] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [isConnect, setIsConnect] = useState(false)
  const [isNotConnect, setIsNotConnect] = useState('')
  const [token, setToken] = useState('')
  const [tokenIsSubmited, setTokenIsSubmited] = useState(false)

  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setFirstName("");
    setLastName("");
    setMail("");
    setPassword("");
    setPhoneNumb("");
    setAddress("");
    setPostalCode("");
    setCity("");

  }

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {
        setToken(value);
        onSubmitToken(value);
        setTokenIsSubmited(true);
      }
    })
  }, []);


  var handleClick = async () => {

    const dataUsers = await fetch(`http://${IP_HOST}:3000/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `firstNameFromFront=${firstName}&lastNameFromFront=${lastName}&emailFromFront=${email}&passwordFromFront=${password}&addressFromFront=${address}&postalCodeFromFront=${postalCode}&cityFromFront=${city}`
    });

    console.log(body);


    const dataConsumers = await dataUsers.json()

    setIsConnect(dataConsumers.result)
    setIsNotConnect(dataConsumers.error)
    console.log(dataConsumers.saveUser.token)
    onSubmitToken(dataConsumers.saveUser.token)
    AsyncStorage.setItem('userToken', dataConsumers.saveUser.token);
  }

  if (isConnect == true) {
    if (typeOfAction == 'acheteur') {
      navigation.navigate('Basket');
    }
    else {
      navigation.navigate('Sell')
    }
  }



  return (

    <View style={{ flex: 1, marginTop: 50, width: '95%', marginLeft: 10 }}>

      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>Sign up</Text>


      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>

        <ScrollView>

          <Input name="firstName" placeholder='First name' value={firstName} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setFirstName(val)} />

          <Input name="lastName" placeholder='Last name' value={lastName} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setLastName(val)} />

          <Input name="mail" placeholder='email' value={email} autoCorrect={false} returnKeyType="next" keyboardType="email-address" autoCapitalize="none"
            onChangeText={(val) => setMail(val)} />

          <Input name="password" placeholder='Password' value={password} autoCorrect={false} returnKeyType="next" autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true} />

          <Input name="Address" placeholder='Address' value={address} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setAddress(val)} />

          <Input name="Zip" placeholder='Postal Code' value={postalCode} keyboardType='numeric' returnKeyType="next"
            onChangeText={(val) => setPostalCode(val)} />

          <Input name="City" placeholder='City' value={city} autoCorrect={false} returnKeyType="next"
            onChangeText={(val) => setCity(val)} />

          <Button style={{ marginTop: 20 }}
            title="Sign up"
            buttonStyle={{ backgroundColor: "#009788" }}
            type="solid"
            onPress={() => { 
              handleClick(); 
              clickToClean();
              navigation.navigate('Home')
             } }
            
          />
          <Text>{isNotConnect}</Text>

        </ScrollView>

      </KeyboardAvoidingView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


function mapDispatchToProps(dispatch) {
  return {
    onSubmitToken: function (token) {
      dispatch({ type: 'informationFromSignUp', token: token })
    }
  }
}

function mapStateToProps(state) {
  return { typeOfAction: state.typeOfAction }
}


export default connect(

  mapStateToProps,
  mapDispatchToProps

)(SignUpScreens);