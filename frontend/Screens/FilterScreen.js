import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';

function FilterScreen(props) {

  const [DisplaySubCat, setDisplaySubCat] = useState([]);

  const [DisplaySecondFilter1, setDisplaySecondFilter1] = useState(false);
  const [DisplaySecondFilter2, setDisplaySecondFilter2] = useState(false);
  const [DisplaySecondFilter3, setDisplaySecondFilter3] = useState(false);
  const [DisplaySecondFilter4, setDisplaySecondFilter4] = useState(false);
  const [DisplaySecondFilter5, setDisplaySecondFilter5] = useState(false);



  const [colorButton1, setColorButton1] = useState(false);
  const [colorButton2, setColorButton2] = useState(false);
  const [colorButton3, setColorButton3] = useState(false);
  const [colorButton4, setColorButton4] = useState(false);
  const [colorButton5, setColorButton5] = useState(false);

  const [subCatSelected, setSubCatSelected] = useState(false);
  const [subCatName, setSubCatName] = useState('');




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


  if (DisplaySecondFilter1 == true) {
    setDisplaySubCat(subCat1)
    setDisplaySecondFilter1(false)
  }
  else if (DisplaySecondFilter2 == true) {
    setDisplaySubCat(subCat2)
    setDisplaySecondFilter2(false)
  }
  else if (DisplaySecondFilter3 == true) {
    setDisplaySubCat(subCat3)
    setDisplaySecondFilter3(false)
  }
  else if (DisplaySecondFilter4 == true) {
    setDisplaySubCat(subCat4)
    setDisplaySecondFilter4(false)
  }
  else if (DisplaySecondFilter5 == true) {
    setDisplaySubCat(subCat5)
    setDisplaySecondFilter5(false)
  }


  var validationButton

  if (subCatSelected == true) {
    validationButton =
      <Button
        buttonStyle={{ marginTop: 10, backgroundColor: '#009788' }}
        containerStyle={{ width: 300, height: 50, alignSelf: 'center' }}
        title='Rechercher'
        onPress={() => props.navigation.navigate('Result')} />
  }

  return (
    <View>
      <Text style={{ fontSize: 15, textAlign: "center", marginTop: 80, marginBottom: 40 }} >Choose a category</Text>


      <View style={styles.buttonRow}>
        <Button title='Motorcycle jacket'
          containerStyle={{ width: 140, height: 50 }}
          buttonStyle={colorButton1 ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#009788' }}
          onPress={() => {
            setDisplaySecondFilter1(true);
            setColorButton1(!colorButton1);
            setColorButton2(false);
            setColorButton3(false);
            setColorButton4(false);
            setColorButton5(false)
          }}
        />


        <Button title="Motorcycle gloves"
          containerStyle={{ width: 140, height: 50 }}
          buttonStyle={colorButton2 ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#009788' }}
          onPress={() => {
            setDisplaySecondFilter2(true);
            setColorButton2(!colorButton2);
            setColorButton1(false);
            setColorButton3(false);
            setColorButton4(false);
            setColorButton5(false)
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title='Motorcycle bags"'
          containerStyle={{ width: 140, height: 50 }}
          buttonStyle={colorButton3 ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#009788' }}
          onPress={() => {
            setDisplaySecondFilter3(true);
            setColorButton3(!colorButton3);
            setColorButton1(false);
            setColorButton2(false);
            setColorButton4(false);
            setColorButton5(false)
          }}
        />

      </View>

      <View style={styles.buttonRow}>
        <Button title='Motorcycle boots and shoes'
          containerStyle={{ width: 140, height: 50 }}
          buttonStyle={colorButton4 ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#009788' }}
          onPress={() => {
            setDisplaySecondFilter4(true);
            setColorButton4(!colorButton4);
            setColorButton1(false);
            setColorButton2(false);
            setColorButton3(false);
            setColorButton4(false)
          }}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button title='Motorcycle pants'
          containerStyle={{ width: 140, height: 50 }}
          buttonStyle={colorButton5 ? { backgroundColor: '#D3D3D3' } : { backgroundColor: '#009788' }}
          onPress={() => {
            setDisplaySecondFilter5(true);
            setColorButton5(!colorButton5);
            setColorButton1(false);
            setColorButton2(false);
            setColorButton3(false);
            setColorButton4(false)
            setColorButton5(false)

          }}
        />
      </View>
      <View style={styles.buttonRow2}>
        <Picker
          selectedValue={subCatName}
          style={{ height: 50, width: 300, justifyContent: 'center' }}

          onValueChange={(itemValue, itemIndex) => {
            setSubCatName(itemValue);
            setSubCatSelected(true);
            props.onSubCatSelected(itemValue);
          }
          }>

          {DisplaySubCat.map((e, i) => {
            return (
              <Picker.Item label={e.subcategory} value={e.subcategory} />
            )
          }
          )}


        </Picker>
      </View>

      {validationButton}
    </View>


  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 5,
  },
  titlePage: {

    marginTop: 80,
    marginLeft: 75,
    fontSize: 20,
    marginBottom: 80,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,

  },
  buttonRow2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 70,
  }

})

function mapDispatchToProps(dispatch) {
  return {
    onSubCatSelected: function (subcat) {
      dispatch({ type: 'picker', subcat: subcat })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FilterScreen);