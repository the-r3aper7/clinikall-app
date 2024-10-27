import DeliveryEstimation from './DeliveryEstimation';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { useQuery } from 'react-query';
import { fetchProduct, fetchPincodeDetails } from '../services/api';
import PincodeInput from './PincodeInput';
import {MaterialIcons} from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { colors } from '../theme/color';

interface ProductDetailsProps {
  productId: number;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack }) => {
  const [pincode, setPincode] = React.useState<string>('');
  const {addToCart} = useCart()

  const [pincodeError, setPincodeError] = React.useState('');

  const handlePincodeChange = (text: string) => {
    setPincode(text);
    setPincodeError('');
  };
  // Fetch product details
  const { data: product, isLoading, isError } = useQuery(
    ['product', productId],
    () => fetchProduct(productId),
  );

  // Fetch pincode details when pincode is entered
  const { data: deliveryInfo, isLoading: isPincodeLoading } = useQuery(
    ['pincode', pincode],
    () => fetchPincodeDetails(parseInt(pincode, 10)),
    {
      enabled: pincode.length === 6,
      retry: false,
    }
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="error-outline" size={48} />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>Failed to load product details</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product?.product_image }} 
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product?.product_name}</Text>
          <Text style={styles.productPrice}>₹{product?.price.toFixed(2)}</Text>
          
          <View style={styles.stockIndicator}>
            <View style={[
              styles.stockBadge,
              product?.in_stock ? styles.inStockBadge : styles.outOfStockBadge
            ]}>
              <MaterialIcons 
                name={product?.in_stock ? "check-circle" : "remove-circle"} 
                size={16} 
                color={product?.in_stock ? colors.success : colors.error} 
              />
              <Text style={[
                styles.stockText,
                product?.in_stock ? styles.inStockText : styles.outOfStockText
              ]}>
                {product?.in_stock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Pincode Input */}
          <View style={styles.pincodeSection}>
            <PincodeInput
              value={pincode}
              onChangeText={handlePincodeChange}
              isLoading={isPincodeLoading}
              error={pincodeError}
            />

            {pincode.length === 6 && (
              <DeliveryEstimation
                pincode={pincode}
                isProductInStock={product?.in_stock ?? false}
              />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !product?.in_stock && styles.disabledButton
          ]}
          onPress={() => addToCart(product)}
          disabled={!product?.in_stock}
        >
          <MaterialIcons name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  stockIndicator: {
    marginBottom: 20,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  inStockBadge: {
    backgroundColor: colors.success + '15',
  },
  outOfStockBadge: {
    backgroundColor: colors.error + '15',
  },
  stockText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  inStockText: {
    color: colors.success,
  },
  outOfStockText: {
    color: colors.error,
  },
  pincodeSection: {
    marginTop: 20,
  },
  bottomAction: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: colors.text.light,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    marginBottom: 8,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImageView: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'center',
  },
  deliverySection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2d2936',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  deliveryInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#2d2936',
    borderRadius: 8,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#fff',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  
});

export default ProductDetails;
