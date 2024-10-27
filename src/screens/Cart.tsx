import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigation/AppNavigation';
import CartList from '../components/CartList';

type Props = NativeStackScreenProps<AppStackParams, 'CartScreen'>;

const CartScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <CartList onBack={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201d29',
  },
});

export default CartScreen;