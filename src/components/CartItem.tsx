import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { CartItem as CartItemType } from '../context/CartContext';
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from "../theme/color"

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem = ({ 
  item, 
  onRemove, 
  onUpdateQuantity 
}: CartItemProps) => {
  return (  
    <View style={styles.container}>
      <Image 
        source={{ uri: item.product.product_image }}
        style={styles.image}
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.details}>
          <Text style={styles.name}>{item.product.product_name}</Text>
          <Text style={styles.price}>₹{item.product.price.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.quantity}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <MaterialIcons 
                name="remove" 
                size={16} 
                color={item.quantity <= 1 ? colors.text.light : colors.text.primary} 
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item.quantity + 1)}
            >
              <MaterialIcons name="add" size={16} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <MaterialIcons name="delete" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.surface,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 8,
  },
});

export default CartItem;