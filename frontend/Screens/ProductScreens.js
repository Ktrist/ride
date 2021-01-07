import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from '../components/Carousel';
import { IP_HOST } from '../variable'




function ProductScreens({ navigation, productId, onSubmitTypeOfAction,takeToken }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  var typeOfAction = 'acheteur';

  var handleClick = async () => {

    if(takeToken){
      navigation.navigate('Basket')
    }else{
      navigation.navigate('SignIn')
    }
  }
  console.log(productId.sellerToken)
  useEffect(() => {
    const findSeller = async () => {
      const data = await fetch(`http://${IP_HOST}:3000/get-seller?SellerToken=${productId.sellerToken}`)
      const body = await data.json()
      setFirstName(body.firstName)
      setLastName(body.lastName)
      
    }

    findSeller();

  }, [])
  
  return (
    <View style={{ flex: 1, marginTop: 40, width: '95%', marginLeft: 10 }}>
      <FontAwesome name="long-arrow-left" size={24} color="#009788"
        onPress={() => navigation.goBack()}
      />
      
      <ScrollView>
        <Carousel />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View style={{ marginLeft: 10 }}>
            <Text style={{color:"black"}}>{firstName} {lastName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Icon name='star'
                color='#f9ca24'
                size={20}
              />
              <Text style={{ marginLeft: 10 }}>70 Reviews</Text>
            </View>
          </View>
          <FontAwesome name="heart" size={20} style={{ color: 'black', marginLeft: 130}}/>
        </View>
        <View style={styles.containerCarac}>
          <Text style={{ fontWeight: 'bold' }}>{productId.title}</Text>
          <Text>Price: {productId.price} €</Text>
        </View>
        <View style={styles.containerCarac}>
          <Text>Brand : {productId.brand}</Text>
          <Text>shipping Fees: {productId.shippingFees}€</Text>
        </View>
        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
          <ScrollView>
            <Text style={{ fontStyle: 'italic' }}>Description :</Text>
            <Text>{productId.description}</Text>
          </ScrollView>
        </View>
        <Button
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#009788" }}
          type='solid'
          title='Buy'
          onPress={() => { handleClick(); onSubmitTypeOfAction(typeOfAction) }}
        />
      </ScrollView>


    </View>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 30
  },

  image: {
    width: 355,
    height: 400,
  },

  containerCarac: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10

  }
});


function mapStateToProps(state) {
  return { productId: state.product, takeToken:state.token }
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmitTypeOfAction: function (typeOfAction) {
      dispatch({ type: 'buy', typeOfAction })
    }
  }
}

export default connect(

  mapStateToProps,
  mapDispatchToProps


)(ProductScreens); 