import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Overlay, Image } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
// IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';


import { IP_HOST } from '../variable'



function AddPicScreen(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [visible, setVisible] = useState(false);
  var camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //IMAGE PICKER
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,



    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    var data = new FormData();
    data.append('avatar', {
      uri: result.uri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    const dataPhotoGallery = await fetch(`http://${IP_HOST}:3000/upload`, {
      method: 'POST',
      body: data
    })

    const bodyImageGallery = await dataPhotoGallery.json()

    props.onIncreaseClick(bodyImageGallery.url)
  };

  // CAMERA
  var cameraDisplay;
  if (hasPermission && props.isFocused) {
    cameraDisplay = <Camera
      style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >

      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'column',
          justifyContent: "flex-start"
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <IconFontAwesome
            name="camera"
            size={20}
            color="#ffffff"
          /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}

          onPress={() => {
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            );
          }}
        >
          <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
          /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
        </TouchableOpacity>

      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'column',
          justifyContent: "flex-end"
        }}>
        <TouchableOpacity
          style={{

            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}

          onPress={async () => {
            setVisible(true);
            if (camera) {
              let photo = await camera.takePictureAsync({
                quality: 0.5,
                base64: true,
                exif: true,
              });
              console.log('PHOTO URI', photo.uri);
              console.log('PHOTO WIDTH', photo.width);
              console.log('PHOTO HEIGHT', photo.height);
              console.log('PHOTO EXIF', photo.exif);
              // console.log('PHOTO base64', photo.base64);
              
              setVisible(false);
              // console.log("photo prise",photo)
              var data = new FormData();
              data.append('avatar', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'avatar.jpg',
              });
              const dataPhoto = await fetch(`http://${IP_HOST}:3000/upload`, {
                method: 'POST',
                body: data
              })
              const bodyImage = await dataPhoto.json()
              // console.log("bodyImage",bodyImage)                      
              props.onIncreaseClick(bodyImage.url)
            }
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconWrapper}>
              <IconFontAwesome
                name="camera"
                size={50}
                color="#ffffff"

              />
            </View>
            <View style={styles.iconWrapper2}>
              <Text style={{ fontSize: 15, marginBottom: 2, color: 'white' }}> + </Text>
              <Ionicons
                onPress={pickImage}
                name="md-images"
                size={25}
                color="#ffffff"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }

  return (
    <View style={{ flex: 1 }}>

      <Overlay isVisible={visible} width="auto" height="auto">
        <Text>Loading</Text>
      </Overlay>

      {cameraDisplay}

      <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 2, justifyContent: "space-between" }}>
        <View>
          <Image source={{ uri: props.addPhoto[0] }} style={{ height: 70, width: 70 }} />
        </View>
        <View>
          <Image source={{ uri: props.addPhoto[1] }} style={{ height: 70, width: 70 }} />
        </View>
        <View>
          <Image source={{ uri: props.addPhoto[2] }} style={{ height: 70, width: 70 }} />
        </View>
      </View>

      <Button
        title="Save my pictures"
        buttonStyle={{ backgroundColor: "#009788", }}
        containerStyle={{ marginBottom: 2 }}
        type="solid"
        onPress={() => props.navigation.navigate('Sell')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 100,
    borderRadius: 100,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 20,
    alignItems: "center",
    margin: 10
  },
  iconWrapper2: {
    width: 60,
    borderRadius: 100,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 5,
    alignItems: "center",
    margin: 28,
    flexDirection: "row"
  }
})

function mapStateToProps(state) {
  return { addPhoto: state.photo }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: function (url) {
      dispatch({ type: 'increase', photoUrl: url })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(AddPicScreen));

