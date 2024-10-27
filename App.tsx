import { QueryClient, QueryClientProvider } from 'react-query';
import { RootNavigation } from './src/navigation/AppNavigation';
import { CartProvider } from './src/context/CartContext';
import { colors } from './src/theme/color';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
          <View style={styles.container}>
            <RootNavigation />
          </View>
        </CartProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#201d29',
  },
});