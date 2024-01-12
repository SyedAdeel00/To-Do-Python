import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
      <TouchableOpacity onPress={() => onSelect(product)}>
        <Text>Details</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onAddToCart(product)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
