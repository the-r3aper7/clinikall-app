import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigation/AppNavigation';
import ProductDetails from '../components/ProductDetails';
import { colors } from '../theme/color';

type Props = NativeStackScreenProps<AppStackParams, 'ProductDetailScreen'>;

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const productId = route.params.pid;
  return (
    <View style={styles.container}>
      <ProductDetails
        productId={productId}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ProductDetailScreen;