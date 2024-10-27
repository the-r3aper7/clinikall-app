import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useQuery } from 'react-query';
import { fetchPincodeDetails } from '../services/api';
import DeliveryCountdown from './DeliveryCountdown';
import { colors } from '../theme/color';

interface DeliveryEstimationProps {
  pincode: string;
  isProductInStock: boolean;
}

interface DeliveryEstimate {
  date: string;
  message: string;
  cutoffTime: Date | null;
  showCountdown: boolean;
}


const DeliveryEstimation = ({
  pincode,
  isProductInStock,
}: DeliveryEstimationProps) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validate pincode format
  const isPincodeValid = (code: string): boolean => {
    return /^\d{6}$/.test(code);
  };

  // Query for pincode details with error handling
  const {
    data: pincodeInfo,
    isLoading,
    error: pincodeError,
  } = useQuery(
    ['pincode', pincode],
    () => fetchPincodeDetails(parseInt(pincode, 10)),
    {
      enabled: isPincodeValid(pincode),
      retry: 1,
      onError: (error: any) => {
        console.log(error)
        if (error.response?.status === 404) {
          setValidationError('Delivery not available in this area');
        } else {
          setValidationError('Delivery not available in this area');
        }
      },
    }
  );

  const getDeliveryEstimate = (): DeliveryEstimate | null => {
  if (!pincodeInfo || !isProductInStock) return null;

  const now = new Date();
  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  switch (pincodeInfo.logistics_provider) {
    case 'Provider A':
      // Provider A: Same-day if ordered before 5 PM and in stock
      if (currentHour < 17 || (currentHour === 17 && currentMinutes === 0)) {
        return {
          date: today,
          message: 'Same-day delivery',
          cutoffTime: new Date(now.setHours(17, 0, 0, 0)),
          showCountdown: true
        };
      } else {
        return {
          date: tomorrowString,
          message: 'Next-day delivery',
          cutoffTime: null,
          showCountdown: false
        };
      }

    case 'Provider B':
      // Provider B: Same-day if ordered before 9 AM, next-day otherwise
      if (currentHour < 9 || (currentHour === 9 && currentMinutes === 0)) {
        return {
          date: today,
          message: 'Same-day delivery',
          cutoffTime: new Date(now.setHours(9, 0, 0, 0)),
          showCountdown: true
        };
      } else {
        return {
          date: tomorrowString,
          message: 'Next-day delivery',
          cutoffTime: null,
          showCountdown: false
        };
      }

    case 'General Partners':
      // General Partners: 2-5 days delivery window
      if (pincodeInfo.delivery_tat_days < 2) {
        pincodeInfo.delivery_tat_days = 2; // Ensure minimum 2 days
      } else if (pincodeInfo.delivery_tat_days > 5) {
        pincodeInfo.delivery_tat_days = 5; // Cap at 5 days
      }

      const estimatedDeliveryDate = new Date(now);
      estimatedDeliveryDate.setDate(
        estimatedDeliveryDate.getDate() + pincodeInfo.delivery_tat_days
      );

      const deliveryDateString = estimatedDeliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return {
        date: deliveryDateString,
        message: `Delivery in ${pincodeInfo.delivery_tat_days} days`,
        cutoffTime: null,
        showCountdown: false
      };

    default:
      return null;
  }
  };

  // Check if delivery is possible
  const checkDeliveryPossibility = () => {
    if (!isProductInStock) {
      return {
        possible: false,
        message: 'Product is currently out of stock',
        type: 'error' as const,
      };
    }

    if (!pincodeInfo) {
      return {
        possible: false,
        message: validationError || 'Invalid pincode',
        type: 'error' as const,
      };
    }

    const now = new Date();
    const currentHour = now.getHours();

    switch (pincodeInfo.logistics_provider) {
      case 'Provider A':
        if (currentHour >= 17) {
          return {
            possible: true,
            message: 'Cutoff time passed for same-day delivery',
            type: 'warning' as const,
          };
        }
        break;
      case 'Provider B':
        if (currentHour >= 9) {
          return {
            possible: true,
            message: 'Cutoff time passed for same-day delivery',
            type: 'warning' as const,
          };
        }
        break;
    }

    return {
      possible: true,
      message: '',
      type: 'success' as const,
    };
  };

  const deliveryStatus = checkDeliveryPossibility();
  const deliveryEstimate = getDeliveryEstimate();

  // Show alert for out of stock products
  useEffect(() => {
    if (!isProductInStock) {
      Alert.alert(
        'Product Out of Stock',
        'This product is currently unavailable. Would you like to be notified when it\'s back in stock?',
        [
          { text: 'No, thanks', style: 'cancel' },
          {
            text: 'Notify Me',
            onPress: () => {
              // Implement notification logic
              Alert.alert('Notification Set', 'We\'ll notify you when the product is back in stock.');
            }
          },
        ]
      );
    }
  }, [isProductInStock]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Checking delivery options...</Text>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      deliveryStatus.type === 'error' && styles.errorContainer
    ]}>
      {/* Status Message */}
      {deliveryStatus.message && (
        <View style={[
          styles.statusBar,
          styles[`${deliveryStatus.type}StatusBar`]
        ]}>
          <Text style={styles.statusText}>{deliveryStatus.message}</Text>
        </View>
      )}

      {/* Delivery Information */}
      {deliveryStatus.possible && pincodeInfo && (
        <>
          <View style={styles.providerInfo}>
            <Text style={styles.provider}>
              {pincodeInfo.logistics_provider}
            </Text>
            {deliveryEstimate && (
              <>
                <Text style={styles.deliveryDate}>
                  Estimated Delivery: {deliveryEstimate.date}
                </Text>
                <Text style={styles.message}>{deliveryEstimate.message}</Text>
              </>
            )}
          </View>

          {/* Countdown Timer */}
          {deliveryEstimate?.showCountdown && (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownLabel}>Order within</Text>
              <DeliveryCountdown cutoffTime={deliveryEstimate.cutoffTime!} />
              <Text style={styles.countdownLabel}>for same-day delivery</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginVertical: 8,
  },
  providerInfo: {
    marginBottom: 8,
  },
  provider: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  message: {
    fontSize: 14,
    color: colors.success,
  },
  countdownContainer: {
    marginTop: 8,
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countdownLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  errorContainer: {
    borderColor: colors.error,
    borderWidth: 1,
    backgroundColor: colors.error + '15', // 15% opacity for light red background
  },
  statusBar: {
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  errorStatusBar: {
    backgroundColor: colors.error + '30',
  },
  warningStatusBar: {
    backgroundColor: colors.warning + '15',
    borderWidth: 1,
    borderColor: colors.warning,
  },
  successStatusBar: {
    backgroundColor: colors.success + '15',
    borderWidth: 1,
    borderColor: colors.success,
  },
  statusText: {
    color: colors.text.primary,
    fontSize: 14,
    textAlign: 'center',
  },
  deliveryDate: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  loadingText: {
    color: colors.text.secondary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DeliveryEstimation;