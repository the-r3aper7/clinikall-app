import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { fetchProducts } from '../services/api';
import ProductCard from './ProductCard';
import ErrorView from './ErrorView';
import { Product } from '../types/product';
import { colors } from '../theme/color';

interface ProductListProps {
  onProductPress: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onProductPress }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery(
    'products',
    ({ pageParam = 1 }) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.items.length === 0) return undefined;
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return undefined;
      },
    }
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <ErrorView
          message="No products found"
          actionLabel="Try Again"
          onAction={refetch}
        />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <ErrorView
          message="Failed to load products"
          actionLabel="Try Again"
          onAction={refetch}
        />
      </View>
    );
  }

  const allProducts = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <FlatList
      data={allProducts}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => onProductPress(item.product_id)} />
      )}
      keyExtractor={(item) => item.product_id.toString()}
      contentContainerStyle={styles.list}
      // ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor="#007AFF"
          colors={['#007AFF']}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 8,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default ProductList;