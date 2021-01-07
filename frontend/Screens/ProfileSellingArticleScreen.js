import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'

const ProfileSellingArticleScreen = (props) => {

const [productList, setProductList] = useState([]);


useEffect(() => {

    const findProducts = async () => {
      const data = await fetch(`http://${IP_HOST}:3000/get-article-by-seller?SellerToken=${props.takeToken}`)
      const body = await data.json()
      setProductList(body.products);
    }
    findProducts()
  }, [])

  // ---------------- travail sur route delete dans mes annonces

  var handleClickDeleteArticle = async (id) => {

    await fetch(`http://${IP_HOST}:3000/delete-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `idArticle=${id}`
    });
  }

  // ---------------- fin travail sur route delete dans mes annonces
  
  function formatDate(date) {
    var newDate = new Date(date);
    var finalFormat = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    return finalFormat;
  }

  let cardList = productList.map((e, i) => {
    return <View>
      <Image style={{ width: "100%", height: 350 }} source={{ uri: e.images[0] }}></Image>
      <Text style={{ fontSize: 22, padding: 2 }}>{e.title}</Text>
      <Text style={{ padding: 2 }}>{e.price}€ - Date of sell: {formatDate(e.creationDate)}</Text>
      <View style={{ flex: 1, flexDirection: "row", padding: 2 }}>
        <FontAwesome name={'trash'} size={24} color='#009788' />
        <Text style={{ marginTop: 5, marginLeft: 5, marginBottom: 25 }} onPress={() => { handleClickDeleteArticle(e._id) }}>Delete the ad</Text>
      </View>
    </View>
  });
  
  

  return (
    <View style={{ flex: 1, marginTop: 50, width: '95%', marginLeft: 10 }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <FontAwesome name="long-arrow-left" size={24} color="#009788" style={{ marginTop: 5 }} onPress={() => props.navigation.navigate('Menu')} />
        <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 120 }}>My sales</Text>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        {cardList}
      </ScrollView>
    </View>
  );
}

function mapStateToProps(state) {
  return { takeToken: state.token }
}


export default connect(
  mapStateToProps,
  null
)(ProfileSellingArticleScreen)