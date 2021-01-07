import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IP_HOST } from '../variable'

function BasketScreens({ navigation, productId, takeToken }) {

  console.log(productId);
  const [buyer, setBuyer] = useState({});
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  console.log('seller token in BasketScreen', productId.sellerToken);
  useEffect(() => {
    const findBuyer = async () => {
      const data = await fetch(`http://${IP_HOST}:3000/get-user?UserToken=${takeToken}`)
      const body = await data.json()
      setBuyer(body.data)

    }

    findBuyer();

  }, [])

  useEffect(() => {
    const findSeller = async () => {
      const data = await fetch(`http://${IP_HOST}:3000/get-seller?SellerToken=${productId.sellerToken}`)
      const body = await data.json()
      setFirstName(body.firstName)
      setLastName(body.lastName)

    }

    findSeller();

  }, [])


  var handleClick = async () => {

    const dataOrder = await fetch(`http://${IP_HOST}:3000/validate-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `articleId=${productId._id}&clientToken=${takeToken}`
    });

    const dataAnnonce = await dataOrder.json()

  }

  let totalPrice = parseInt(productId.price) + parseInt(productId.shippingFees);
  const [selectedValue, setSelectedValue] = useState(false);
  var userData
  if (selectedValue == true) {
    userData = <View style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 10 }}>
      <Text>My shiiping address : </Text>
      <Text>{buyer.firstName}</Text>
      <Text>{buyer.lastName}</Text>
      <Text>{buyer.email}</Text>
      <Text>{buyer.address}</Text>
      <Text>{buyer.postalCode}</Text>
      <Text>{buyer.city}</Text>
    </View>
  }

  return (

    <View style={{ flex: 1, marginTop: 40, width: '95%', marginLeft: 10 }}>
      <FontAwesome name="long-arrow-left" size={24} color="#009788"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Carousel />
        <View style={{ flexDirection: 'row', marginTop: 10 }}>

          <View style={{ marginLeft: 10 }}>
            <Text >{firstName} {lastName}</Text>
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
          
              
              <Text style={{ marginLeft: 10 }}>17 Reviews</Text>
            </View>
          </View>
          <FontAwesome name="heart" size={20} style={{ color: 'black', marginLeft: 130}}/>
        </View>


        <View style={styles.containerCarac}>
          <Text style={{ fontWeight: 'bold' }}>{productId.title}</Text>
          <Text>Price : {productId.price} €</Text>
        </View>
        <View style={styles.containerCarac}>
          <Text>Brand : {productId.brand}</Text>
          <Text>shipping Fees : {productId.shippingFees} €</Text>
        </View>
        <View style={{ flexDirection: 'row-reverse', marginTop: 10, marginLeft: 10 }}>
          <Text> Total : {totalPrice} €</Text>
        </View>
        <DropDownPicker
          items={[
            { label: 'Colissimo', value: 'Colissimo' },
            { label: 'DHL', value: 'DHL' },
            { label: 'Happy-Post', value: 'Happy-Post' },
          ]}
          defaultIndex={0}
          defaultNull
          placeholder="Select your shipment"
          containerStyle={{ height: 40, margin: 10 }}
          onChangeItem={() => { setSelectedValue(true) }}
        />
        {userData}

        <Button
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#009788' }}
          title='Proceed to the payment'
          onPress={() => { handleClick(); setModalVisible(true) }} />


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Thanks! {firstName} {lastName} is about to send your order !</Text>
              <Text style={styles.modalText}>Once you received your order, don't forget to finalize the deal in your account</Text>


              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#009788" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('ArticleBought')
                }}
              >
                <Text style={styles.textStyle}>See my order</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  containerCarac: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",

    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});

function mapStateToProps(state) {
  console.log("state is stable", state.product)
  return { productId: state.product, takeToken: state.token }
};

export default connect(
  mapStateToProps,
  null
)(BasketScreens);
