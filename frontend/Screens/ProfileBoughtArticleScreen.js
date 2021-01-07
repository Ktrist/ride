import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, Modal, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'



const ProfileBoughtArticleScreen = (props) => {

  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible]=useState(false)

  var handleClick = async (value) => {

    const data = await fetch(`http://${IP_HOST}:3000/receive-order?idArticle=${value._id}&sellerToken=${value.sellerToken}&productPrice=${value.price}`) 
    const body = await data.json()
    }
    
   
    const [productList, setProductList] = useState([]);
    const [productListReceive, setProductListReceive] = useState([]);
    const [stateOfOrder,setStateOfOrder]= useState('Valider la réception de cet achat')

  useEffect(() => {

    const findProducts = async () => {

      const data = await fetch(`http://${IP_HOST}:3000/get-article-by-buyer?buyerToken=${props.takeToken}`)
      const body = await data.json()

      setProductList(body.articlesTab);
      setProductListReceive(body.articlesTabValidate)

    }

    findProducts()

  }, [loading])



  function formatDate(date) {
    var newDate = new Date(date);
    var finalFormat = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return finalFormat;
  }

  let cardList1 = productList.map((e, i) => {
    return <View>
      <Image style={{ width: "100%", height: 350 }} source={{ uri: e.images[0] }}></Image>
      <Text style={{ fontSize: 22, padding: 2 }}>{e.title}</Text>
      <Text style={{ padding: 2 }}>{e.price}€ - date of purchase: {formatDate(e.creationDate)}</Text>
      <View style={{ flex: 1, flexDirection: "row", padding: 2, marginBottom: 20 }}>
        <FontAwesome style={{ marginTop: 5 }} name={'gift'} size={24} color='#009788' />
        <Button buttonStyle={{ height: 35, backgroundColor: '#009788', marginLeft: 10 }} titleStyle={{ fontSize: 15, color: 'white' }} title="I well received my order" type="outline" onPress={() => { handleClick(e), setModalVisible(true), setLoading(!loading) }} />

      </View>
    </View>
  });
  let cardList2 = productListReceive.map((e, i) => {
    return <View>
      <Image style={{ width: "100%", height: 350 }} source={{ uri: e.images[0] }}></Image>
      <Text style={{ fontSize: 22, padding: 2 }}>{e.title}</Text>
      <Text style={{ padding: 2 }}>{e.price}€ - Date of purchase: {formatDate(e.creationDate)}</Text>
      <View style={{ flex: 1, flexDirection: "row", padding: 2 }}>
        <FontAwesome name={'check'} size={24} color='#009788' />
        <Text style={{ marginTop: 5, marginLeft: 5, marginBottom: 25 }} >Validated purchase</Text>
      </View>
    </View>
  });

  let modalDisplay = <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Thanks for validating your purchase !</Text>
        <Text style={styles.modalText}>We are going to proceed to the payment</Text>


        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#009788" }}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.navigation.navigate('ArticleBought')
          }}
        >
          <Text style={styles.textStyle}>See my order</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>


  return (
    <View style={{ flex: 1, marginTop: 50, width: '95%', marginLeft: 10 }}>
       <View style={{ flexDirection: 'row', width: '100%' }}>
        <FontAwesome name="long-arrow-left" size={24} color="#009788" style={{ marginTop: 5 }} onPress={() => props.navigation.navigate('Menu')} />
        <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 120 }}>My purchase</Text>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        {cardList1}
        {cardList2}
        {modalDisplay}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    color: '#D6A2E8',
    fontFamily: 'sans-serif-light'

  },
  item: {
    paddingTop: 10,
    fontFamily: 'sans-serif-light',
    fontSize: 18,
    height: 44,
    borderBottomColor: '#82589F',
    color: '#82589F',
    borderBottomWidth: 1,

  },
  icon: {
    padding: 300,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'sans-serif-light'
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
})

function mapStateToProps(state) {
  return { takeToken: state.token }
}


export default connect(
  mapStateToProps,
  null
)(ProfileBoughtArticleScreen)
