import React, {useState, useEffect} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import {IP_HOST} from '../variable'


function ResultScreens(props) {

  const [productList, setProductList] = useState([])


  useEffect(() => {
    const findProducts = async() => {
      const data = await fetch(`http://${IP_HOST}:3000/filter-articles?subcat=${props.Subcat}`)
      const body = await data.json()
      setProductList(body.products);
      
    }

    findProducts()

  },[props.Subcat])
  

  let lastArticles = productList.map((productId, i) => {
    return <View style={{width:'47%', margin:5}}>
      <TouchableOpacity
        onPress={() => {
          props.onSubmitProduct(productId);
          props.navigation.navigate('Product');

         }
        }
      >
      <Image source={{uri:productId.images[0]}} style={{ height:250, width: 200 }}/>
      <View style={{flex: 1, flexDirection:'row', marginTop:5, justifyContent:"space-between"}}>
        <Text style={{fontWeight:'bold'}}>{productId.brand}</Text>
        <FontAwesome name="heart-o" size={15} color="black" />
      </View>
      <Text>{productId.title}</Text>
      <Text>{productId.price}€</Text>
      </TouchableOpacity>
    </View>

  }
  )


  return (
    <View style={{marginTop:50}}>

      <Text style={{fontSize:18, marginBottom:5, marginLeft:10, textAlign:'center'}}>Your research :</Text>

      <Text style={{fontSize:18, fontWeight:'bold', marginBottom:5, marginLeft:10, textAlign:'center' }}>"{props.Subcat}"</Text>

      <ScrollView> 
        <View style={{flex: 1, flexDirection:'row', width:'95%', flexWrap: 'wrap', justifyContent:"space-between", margin:10}}>
          {lastArticles}
        </View>
      </ScrollView>
    </View>
  )
}


function mapStateToProps(state){
  return{Subcat : state.subcat, product: state.product}
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitProduct: function (product) {
      dispatch({ type: 'pickProduct', product:product})
    }
  }
}
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(withNavigation (ResultScreens));
