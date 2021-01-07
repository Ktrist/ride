
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage, Image} from 'react-native';
import { Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'




function HomeScreens({ navigation, onSubmitProduct, onSubmitToken }) {
  const [productList, setProductList] = useState([])
  const [filterAddList, setFilterAddList] = useState([])
  const [liked, setLiked] = useState('')
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {

        onSubmitToken(value);

      }
    })
  }, [loading]);

  useEffect(() => {
    const findProducts = async () => {
      const data = await fetch(`http://${IP_HOST}:3000/get-all-articles`)
      const body = await data.json()
      setProductList(body.products);
      setFilterAddList(body.products);
    }
    findProducts()
  }, [loading])





  var articleData = [
    { name: "Textile motorcycle jacket", brand: "Dainese", img: require("../assets/Jacket.jpg"), price: '200'},
    { name: "Summer motorcycle gloves", brand: "Furygan", img:require( "../assets/summer_gloves.jpg"), price: '30' },
    { name: "Winter motorcycle gloves", brand: "Triumph", img: require( "../assets/winter_gloves.jpg"), price: '70' },
    { name: "Motorcycle boots", brand: "BMW", img: require("../assets/boots.jpg"), price: '180' },
    { name: "Goretex / waterproof pants", brand: "Dainese", img: require( "../assets/pants.jpg"), price: '150' },
    { name: "Back and safety protection", brand: "Dainese", img: require( "../assets/back_protection.jpg"), price: '100' },
  ]

  var ArticleList = articleData.map((article, i) => {
    return (<View  style={{width: '42%'}}>
      <TouchableOpacity
        onPress={() => {
          onSubmitProduct(productId)
          navigation.navigate('Product')
        }
        }
      >
      <Image source={ article.img}  style={{ height: 250, width: 200} } />
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: "space-between" }}>
        <Text style={{ fontWeight: 'bold' }}>{article.brand}</Text>
        <FontAwesome name="heart" size={20} style={{ color: liked.includes(i) ? '#009788' : 'black' }}
           onPress={() => {
            console.log(liked);
            if (liked.includes(i)) {
              let unlike = liked.filter((elem) => elem !== i);
              setLiked(unlike);
            } else {
              setLiked([...liked, i]);
            }
          }} />
      </View>
      <Text>{article.name}</Text>
      <Text>{article.price}€</Text>
      </TouchableOpacity>
    </View> 
    )
  }
  )
  let lastArticles = filterAddList.map((productId, i) => {
    return <View style={{ width: '42%'}}>
      <TouchableOpacity
        onPress={() => {
          onSubmitProduct(productId)
          navigation.navigate('Product')
        }
        }
      >
        <Image source={{ uri: productId.images[0] }} style={{ height: 250, width: 200 }} />
        <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: "space-between" }}>
          <Text style={{ fontWeight: 'bold' }}>{productId.brand}</Text>
          <FontAwesome name="heart" size={20} style={{ color: liked.includes(i) ? '#009788' : 'black' }}
             onPress={() => {
              console.log(liked);
              if (liked.includes(i)) {
                let unlike = liked.filter((elem) => elem !== i);
                setLiked(unlike);
              } else {
                setLiked([...liked, i]);
              }
            }} />
        </View>
        <Text>{productId.title}</Text>
        <Text>{productId.price}€</Text>
      </TouchableOpacity>
    </View>

  }
  )

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', width: '95%', flexWrap: 'wrap', justifyContent: "space-between" }}>
          {ArticleList}
          {lastArticles}
        </View>
      </ScrollView>
    </View>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitProduct: function (product) {
      dispatch({ type: 'pickProduct', product: product })
    }, onSubmitToken: function (token) {
      dispatch({ type: 'informationFromHomeScreen', token: token })
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(HomeScreens);