import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from '../navigation/AppNavigation';
import ProductList from '../components/ProductList';
import {colors} from "../theme/color"

type Props = NativeStackScreenProps<AppStackParams, 'HomeScreen'>;


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProductList
        onProductPress={(productId) =>
          navigation.navigate('ProductDetailScreen', { pid: productId })
        }
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
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default HomeScreen;