import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'

function WalletScreens(props) {


  const [modalVisible, setModalVisible] = useState(false)
  const [transfert, setTransfert] = useState(false)

  // UPDATE WALLET
  const [walletAmount, setWalletAmount] = useState(0)
  useEffect(() => {
    const updateWallet = async () => {
      const dataWallet = await fetch(`http://${IP_HOST}:3000/users/get-Wallet?profileToken=${props.takeToken}`)
      const body = await dataWallet.json()
      setWalletAmount(body.dataWallet.moneyWallet);
    }
    updateWallet()
  }, [])


  let colorFont = "black"
  if (transfert) {
    colorFont = "lightgrey"
  }

  let amountAvailable = <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
    <Text style={{ fontSize: 30, color: colorFont, marginTop: 10, marginBottom: 10 }}>{walletAmount}€</Text>
    <Text style={{ fontSize: 15, marginBottom: 30}}>Available amount</Text>
  </View>

  let modalDisplay = <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>We are going to transfer the total amount of your sales.</Text>
        <Text style={styles.modalText}>It will take about two business days</Text>
        <Text style={styles.modalText}>Thanks again for using RideOn, ride safe</Text>


        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#82589F" }}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.navigation.navigate('ArticleSell')
          }}
        >
          <Text style={styles.textStyle}>My current sales</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>

  return (
    <View style={{ flex: 1, marginTop: 25, width: '95%', marginLeft: 10 }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <FontAwesome name="long-arrow-left" size={24} color="#009788" style={{ marginTop: 5 }} onPress={() => props.navigation.goBack()} />
        <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 90 }}>My wallet</Text>
      </View>

      <View style={{ backgroundColor: '#D7DBDD', height: 1, width: 300, marginLeft: 50, marginTop: 30, marginBottom: 30 }}></View>


      {amountAvailable}

      <Button title="Transfer to my bank account" buttonStyle={{ backgroundColor: "#009788" }} type="solid" onPress={() => { setModalVisible(true); setTransfert(true) }} />

      {modalDisplay}

    </View>


  )
};

const styles = StyleSheet.create({
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
})

function mapStateToProps(state) {
  return { takeToken: state.token }
}

export default connect(
  mapStateToProps,
  null
)(WalletScreens);
