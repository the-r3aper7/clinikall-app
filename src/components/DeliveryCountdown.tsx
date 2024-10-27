import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/color';

interface DeliveryCountdownProps {
  cutoffTime: Date | null;
}

const DeliveryCountdown = ({ cutoffTime } : DeliveryCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (!cutoffTime) {
        return;
      }
      const difference = cutoffTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [cutoffTime]);

  if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <Text style={styles.expired}>
        Same-day delivery no longer available
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{String(timeLeft.hours).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>hrs</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{String(timeLeft.minutes).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>min</Text>
      </View>
      <Text style={styles.separator}>:</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{String(timeLeft.seconds).padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>sec</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  timeBlock: {
    alignItems: 'center',
    minWidth: 40,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeLabel: {
    fontSize: 10,
    color: colors.text.secondary,
    marginTop: 2,
  },
  separator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 4,
  },
  expired: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    padding: 8,
  },
});

export default DeliveryCountdown;