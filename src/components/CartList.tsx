import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import PincodeInput from './PincodeInput';
import { useQuery } from 'react-query';
import { fetchPincodeDetails } from '../services/api';
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from '../theme/color';

interface CartListProps {
  onBack: () => void;
}

const CartList = ({ onBack }: CartListProps) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [pincode, setPincode] = useState<string>('');
  const [pincodeError, setPincodeError] = useState<string>('');

  const validatePincode = (code: string) => {
    if (!code) return 'Pincode is required';
    if (!/^\d+$/.test(code)) return 'Pincode must contain only numbers';
    if (code.length !== 6) return 'Pincode must be 6 digits';
    return '';
  };

  const handlePincodeChange = (code: string) => {
    setPincode(code);
    setPincodeError(validatePincode(code));
  };

  // Fetch delivery details when pincode is entered and valid
  const { data: deliveryInfo, isLoading: isPincodeLoading, error: pincodeQueryError } = useQuery(
    ['pincode', pincode],
    () => fetchPincodeDetails(parseInt(pincode, 10)),
    {
      enabled: pincode.length === 6 && !pincodeError,
      retry: 1,
      onError: () => {
        setPincodeError('Invalid pincode or service not available in this area');
      }
    }
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="shopping-cart" size={64} color={colors.text.secondary} />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <TouchableOpacity style={styles.shopButton} onPress={onBack}>
        <Text style={styles.shopButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (items.length === 0) return null;

    const isValidForCheckout = pincode.length === 6 && !pincodeError && deliveryInfo;

    return (
      <View style={styles.footer}>
        <View style={styles.deliverySection}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <PincodeInput
            value={pincode}
            onChangeText={handlePincodeChange}
            isLoading={isPincodeLoading}
            error={pincodeError}
          />
          
          {isPincodeLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.loadingText}>Checking delivery availability...</Text>
            </View>
          )}

          {deliveryInfo && !pincodeError && (
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryRow}>
                <MaterialIcons name='dashboard' color={colors.text.primary} />
                <Text style={styles.deliveryText}>
                  {deliveryInfo.logistics_provider}
                </Text>
              </View>
              <View style={styles.deliveryRow}>
                <MaterialIcons name="timer" color={colors.text.primary} />
                <Text style={styles.deliveryText}>
                  Delivery in {deliveryInfo.delivery_tat_days} days
                </Text>
              </View>
            </View>
          )}
          
          {pincodeError && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color={colors.error} />
              <Text style={styles.errorText}>{pincodeError}</Text>
            </View>
          )}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Amount:</Text>
            <Text style={styles.summaryValue}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.checkoutButton,
              !isValidForCheckout && styles.disabledButton
            ]}
            disabled={!isValidForCheckout}
          >
            <Text style={styles.checkoutButtonText}>
              {isValidForCheckout ? 'Proceed to Checkout' : 'Enter Valid Pincode to Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeFromCart(item.product.product_id)}
            onUpdateQuantity={(quantity) => 
              updateQuantity(item.product.product_id, quantity)
            }
          />
        )}
        keyExtractor={(item) => item.product.product_id.toString()}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 18,
    color: colors.text.primary,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: colors.text.primary,
  },
  clearButton: {
    padding: 8,
  },
  list: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text.secondary,
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  deliverySection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  deliveryInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.text.primary,
  },
  summary: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.text.light,
    opacity: 0.5,
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFF2F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    marginLeft: 8,
    color: colors.error,
    fontSize: 14,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: colors.text.secondary,
    fontSize: 14,
  },
});

export default CartList;