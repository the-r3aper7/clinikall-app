import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
} from 'react-native';
import { Product } from '../types/product';
import {MaterialIcons} from '@expo/vector-icons';
import { colors } from '../theme/color';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard = ({ product, onPress } : ProductCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: product.product_image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text 
          style={styles.name}
          numberOfLines={2}
        >
          {product.product_name}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>
            ₹{product.price.toFixed(2)}
          </Text>
          <View style={[
            styles.stockBadge,
            product.in_stock ? styles.inStock : styles.outOfStock
          ]}>
            <Text style={[
              styles.stockText,
              product.in_stock ? styles.inStockText : styles.outOfStockText
            ]}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 128,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    height: 40, // Fixed height for 2 lines
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E57C2',
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inStock: {
    backgroundColor: '#E8F5E9',
  },
  outOfStock: {
    backgroundColor: '#FFEBEE',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStockText: {
    color: '#4CAF50',
  },
  outOfStockText: {
    color: '#F44336',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductCard;