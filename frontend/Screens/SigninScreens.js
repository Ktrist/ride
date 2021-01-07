import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'




function SigninScreens({ navigation, onSubmitToken, typeOfAction }) {

  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [isConnect, setIsConnect] = useState(false)
  const [isNotConnect, setIsNotConnect] = useState('')
  const [tokenIsSubmited, setTokenIsSubmited] = useState(false)


  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setMail("");
    setPassword("");
  }

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {

        onSubmitToken(value);
        setToken(value);
        setIsConnect(true);
        console.log('value:', value, 'isConnect', isConnect);

      }
    })
  }, []);


  var handleClick = async () => {

    const dataUsers = await fetch(`http://${IP_HOST}:3000/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `emailFromFront=${email}&passwordFromFront=${password}`
    },
    );

    const dataConsumers = await dataUsers.json()
    setIsConnect(dataConsumers.result)
    setIsNotConnect(dataConsumers.error)
    onSubmitToken(dataConsumers.token)
    AsyncStorage.setItem('userToken', dataConsumers.token);
  }
  if (isConnect == true) {
    if (typeOfAction == 'acheteur') {
      navigation.navigate('Basket');
    }
    else {
      navigation.navigate('home')
    }

  }

  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ marginBottom: 20, fontSize: 20 }}>Connection</Text>

      <ScrollView>

        <KeyboardAvoidingView behavior="padding" enabled style={{ width: 370 }}>


          <Input
            name="email"
            placeholder='email'
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            returnKeyType="next"
            onChangeText={(val) => setMail(val)} />
          <Input
            name="password"
            placeholder='Password'
            returnKeyType="next"
            autoCapitalize="none"
            value={password}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)} />

          <Button style={{ marginTop: 20 }}
            title="Sign in"
            buttonStyle={{ backgroundColor: "#009788" }}
            type="solid"
            onPress={() => {  
              handleClick(); 
              clickToClean();
              navigation.navigate('Home')
            }}
          />

          <Text>{isNotConnect}</Text>

          <Button
            title="Create an account"
            type='outline'
            titleStyle={{ fontSize: 15, color: "#009788" }}
            buttonStyle={{ justifyContent: 'flex-start', borderColor: 'white' }}
            onPress={() => navigation.navigate('SignUp')}
          />


        </KeyboardAvoidingView>

      </ScrollView>

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
      dispatch({ type: 'informationFromSignIn', token: token })
    }
  }
}

function mapStateToProps(state) {
  return { typeOfAction: state.typeOfAction }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninScreens);


