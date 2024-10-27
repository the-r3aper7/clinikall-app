import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import ProductDetailScreen from '../screens/ProductDetail';
import CartScreen from '../screens/Cart';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import {MaterialIcons} from "@expo/vector-icons"
import {TouchableOpacity} from "react-native"

export type AppStackParams = {
  HomeScreen: undefined;
  ProductDetailScreen: { pid: number };
  CartScreen: undefined;
};

function CartButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("CartScreen") }>
      <MaterialIcons name='shopping-cart' size={24} color={"#000"}/>
    </TouchableOpacity>
  )
}

const Stack = createNativeStackNavigator<AppStackParams>();

function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ 
        headerShown: false, 
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#201d29' }
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: true, headerRight: () => (<CartButton />), title: 'Clinikally Challenge'}} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={{headerShown: true, title: 'Product Detail'}} />
      <Stack.Screen name="CartScreen" component={CartScreen} options={{headerShown: true, title: 'Cart'}} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export { RootNavigation }