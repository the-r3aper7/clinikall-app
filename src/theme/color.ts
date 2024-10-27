import { StyleSheet } from "react-native";

export const colors = {
  primary: '#7E57C2', // Purple - Main brand color
  secondary: '#FF5722', // Orange - Secondary actions
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
  },
  border: '#E0E0E0',
  success: '#4CAF50',
  error: '#FF4D4F',
  warning: '#FFA000',
};

const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});