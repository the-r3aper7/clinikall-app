import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {MaterialIcons} from "@expo/vector-icons"

interface ErrorViewProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

const ErrorView = ({
  message,
  actionLabel,
  onAction,
}: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={48} color="#F44336" />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onAction}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorView;