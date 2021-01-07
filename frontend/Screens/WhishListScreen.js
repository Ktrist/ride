
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage, Image} from 'react-native';



export function WhishListScreens({ navigation }) {
  const [liked, setLiked] = useState('')



  var articleData = [
    { name: "Textile motorcycle jacket", brand: "Dainese", img: require("../assets/Jacket.jpg"), price: '200'},
    { name: "Summer motorcycle gloves", brand: "Furygan", img:require( "../assets/summer_gloves.jpg"), price: '30' },
    
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
        <FontAwesome name="heart" size={20} style={{ color: '#009788' }}
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
  
  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row', width: '95%', flexWrap: 'wrap', justifyContent: "space-between" }}>
          {ArticleList}
        </View>
      </ScrollView>
    </View>
  )
}

