import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x2-carousel'
import { connect } from 'react-redux';


function CarouselScreen({ productId }) {

  const renderItem = data => (
    <View key={data} style={{ width: 420, height: 450 }}>
      <Image style={{ width: '100%', height: '100%' }} source={{ uri: data }} />
    </View>
  );

  return (
    <View>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={productId.images}
      />
    </View>

  );
}

function mapStateToProps(state) {
  return { productId: state.product }
};

export default connect(
  mapStateToProps,
  null
)(CarouselScreen);  
