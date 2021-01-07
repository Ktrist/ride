import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Picker, AsyncStorage } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { IP_HOST } from '../variable'



function SellScreen(props) {

  const [titleInput, setTitleInput] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [shippingFees, setShippingFees] = useState("");

  const [catName, setCatName] = useState('');
  const [selectedCatName, setSelectedCatName] = useState(false)
  const [DisplaySubCat, setDisplaySubCat] = useState([]);
  const [subCatName, setSubCatName] = useState('');
  const [selectedValueState, setSelectedValueState] = useState("");



  
  

  // FUNCTION TO CLEAN ALL INPUTS
  function clickToClean() {
    setTitleInput("");
    setDesc("");
    setBrand("");
    setPrice("");
    setShippingFees("");
    setCatName("");
    setSubCatName("");
    setSelectedValueState(false);
    setDisplaySubCat([]);
  }

  useEffect(() => {
    AsyncStorage.getItem('userToken', (err, value) => {
      if (value) {
        props.onSubmitToken(value);
      }
    })
  }, []);

  var typeOfAction = 'vendeur';

  // FUNCTION TO PASS ALL ARTICLE'S DATA
  var handleClick = async () => {

    if (props.takeToken != '') {
      clickToClean();
      props.onSubmitDecreasePhoto();
      var image = JSON.stringify(props.addPhoto);
      const dataArticle = await fetch(`http://${IP_HOST}:3000/create-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `titleFromFront=${titleInput}&descriptionFromFront=${desc}&brandFromFront=${brand}&priceFromFront=${price}&shippingFeesFromFront=${shippingFees}&categoryFromFront=${catName}&subcategoryFromFront=${subCatName}&stateFromFront=${selectedValueState}&imagesFromFront=${image}&sellerToken=${props.takeToken}`
      });

      const dataAnnonce = await dataArticle.json()
      props.navigation.navigate('ArticleSell')
    }
    else {
      props.navigation.navigate('SignIn')
    }
  }
  // FILTERS FOR PICKERS
  var subCat1 = [
    { subcategory: "Leather motorcycle jacket" },
    { subcategory: "Textile motorcycle jacket" },
    { subcategory: "Summer motorcycle jacket and Goretex jacket/ waterproof" },
    { subcategory: "Airbag jacket" },
    { subcategory: "Women's motorcycle jacket" },
    { subcategory: "Back and safety protection" },
]

  var subCat2 = [
    { subcategory: "Summer motorcycle gloves" },
    { subcategory: "Mid-season motorcycle gloves" },
    { subcategory: "Winter motorcycle gloves" },
    { subcategory: "Heated motorcycle gloves" },
    { subcategory: "Goretex motorcycle gloves" },
    { subcategory: "Women's motorcycle gloves" },
    { subcategory: "Undergloves and overgloves" },
]

  var subCat3 = [
    { subcategory: "Backpack" },
    { subcategory: "Leg bag" },
]

  var subCat4 = [
    { subcategory: "Motorcycle boots" },
    { subcategory: "Motorcycle sneakers" },
    { subcategory: "Motorcycle shoes" },
    { subcategory: "Women's boots and shoes" },
]

  var subCat5 = [
    { subcategory: "Jeans" },
    { subcategory: "Textile pants" },
    { subcategory: "Leather trousers" },
    { subcategory: "Women's pants" },
    { subcategory: "Goretex / waterproof pants" },
]


  if (catName == "Motorcycle jacket" && selectedCatName == true) {
    setDisplaySubCat(subCat1)
    setSelectedCatName(false)

  }
  else if (catName == "Motorcycle gloves" && selectedCatName == true) {
    setDisplaySubCat(subCat2)
    setSelectedCatName(false)
  }
  else if (catName == "Motorcycle bags" && selectedCatName == true) {
    setDisplaySubCat(subCat3)
    setSelectedCatName(false)
  }
  else if (catName == "Motocycle boots and shoes" && selectedCatName == true) {
    setDisplaySubCat(subCat4)
    setSelectedCatName(false)
  }
  else if (catName == "Motorcycle pants"  && selectedCatName == true) {
    setDisplaySubCat(subCat5)
    setSelectedCatName(false)
  }




  return (
    <View style={styles.container}>
      <ScrollView style={{ width: '90%' }}>

        <Button
          buttonStyle={{ marginTop: 60, marginBottom: 40, borderColor: "#C0C0C0" }}
          titleStyle={{ fontSize: 25, color: "#009788" }}
          icon={
            <FontAwesome name="camera" size={24} color="#009788" />
          }
          title=" Add pictures of your product"
          type="outline"
          onPress={() => props.navigation.navigate('AddPic')}
        />

        <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 20,justifyContent: "space-evenly" }}>
          <View>
            <Image source={{ uri: props.addPhoto[0] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[1] }} style={{ height: 70, width: 60 }} />
          </View>
          <View>
            <Image source={{ uri: props.addPhoto[2] }} style={{ height: 70, width: 60 }} />
          </View>
        </View>

        <Input style={{ width: '90%' }}
          placeholder='Product name'
          value={titleInput}
          onChangeText={(val) => setTitleInput(val)}
        />
        <Input style={{ width: '90%' }} multiline={true}
          placeholder="Describe your product"
          value={desc}
          onChangeText={(val) => setDesc(val)}
        />
        <Input style={{ width: '90%' }}
          placeholder="Brand"
          value={brand}
          onChangeText={(val) => setBrand(val)}
        />
        <Input style={{ width: '90%' }}
          placeholder='Price'
          value={price}
          onChangeText={(val) => setPrice(val)}
          keyboardType='numeric'
        />
        <Input style={{ width: '90%' }}
          placeholder='Shipping Fees'
          value={shippingFees}
          keyboardType='numeric'
          onChangeText={(val) => setShippingFees(val)}
          keyboardType='numeric'
        />





        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={catName}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setCatName(itemValue);
              setSelectedCatName(true)
            }
            }>
            <Picker.Item label="Category" value="" />
            <Picker.Item label="Motorcycle jacket" value="Motorcycle jacket" />
            <Picker.Item label="Motorcycle gloves" value="Motorcycle gloves" />
            <Picker.Item label="Motorcycle bags" value="Motorcycle bags" />
            <Picker.Item label="Motorcycle boots and shoes" value="Motorcycle boots and shoes" />
            <Picker.Item label="Motorcycle pants" value="Motorcycle pants" />
          </Picker>
        </View>

        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={subCatName}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setSubCatName(itemValue)
            }}>

            {DisplaySubCat.map((e, i) => {
              return (
                <Picker.Item label={e.subcategory} value={e.subcategory} />
              )
            }
            )}
          </Picker>
        </View>

        <View style={styles.buttonRow2}>
          <Picker
            selectedValue={selectedValueState}
            style={{ height: 50, width: 250, justifyContent: 'center' }}

            onValueChange={(itemValue, itemIndex) => {
              setSelectedValueState(itemValue);

            }
            }>
            <Picker.Item label="Condition" value="" />
            <Picker.Item label="Brand new" value="Brand new" />
            <Picker.Item label="Good condition" value="Good condition" />
            <Picker.Item label="Used" value="Used" />
          </Picker>
        </View>

        <Button
          title="Add my ad"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => { handleClick(); props.onSubmitTypeOfAction(typeOfAction) }}
          containerStyle={{ marginBottom: 20 }}
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 70,
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
    color: "black",

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

function mapDispatchToProps(dispatch) {
  return {
    onSubmitTypeOfAction: function (typeOfAction) {
      dispatch({ type: 'sell', typeOfAction })
    },
    onSubmitToken: function (token) {
      dispatch({ type: 'informationFromSellScreen', token: token })
    },
    onSubmitDecreasePhoto: function () {
      dispatch({ type: 'decrease', picture: null })
    }
  }
}

function mapStateToProps(state) {
  return { addPhoto: state.photo, takeToken: state.token }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SellScreen);
