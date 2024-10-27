import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/color';

interface PincodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isLoading: boolean;
  error?: string;
}

const PincodeInput = ({
  value,
  onChangeText,
  isLoading,
  error,
}: PincodeInputProps) => {
  const handleChangeText = (text: string) => {
    // Only allow numbers and length <= 6
    if (/^\d*$/.test(text) && text.length <= 6) {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.inputContainer,
          error ? styles.inputError : value.length === 6 ? styles.inputValid : null
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          placeholder="Enter Pincode"
          placeholderTextColor="#666"
          keyboardType="numeric"
          maxLength={6}
        />
        {isLoading && (
          <ActivityIndicator
            size="small"
            color="#007AFF"
            style={styles.loader}
          />
        )}
        {!isLoading && value.length === 6 && !error && (
          <View style={styles.validIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  inputError: {
    borderColor: colors.error,
    backgroundColor: '#FFF1F0',
  },
  inputValid: {
    borderColor: colors.success,
    backgroundColor: '#F6FFED',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    color: colors.text.primary,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
  },
  loader: {
    marginRight: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  validIcon: {
    marginRight: 16,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#52C41A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PincodeInput;