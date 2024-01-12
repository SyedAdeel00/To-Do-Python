import React from 'react';
import { View, Text } from 'react-native';

const CartItem = ({ item, onRemove }) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <TouchableOpacity onPress={() => onRemove(item)}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

