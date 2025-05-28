import React, { useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import ArcNode from '@/components/ArcNode';
import { arcs } from '@/data/progressionData';

const { height } = Dimensions.get('window');

export default function ActsScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  
  useEffect(() => {
    // Find the current arc index
    const currentArcIndex = arcs.findIndex(arc => arc.status === 'current');
    
    // Calculate scroll position to center the current arc
    if (currentArcIndex !== -1) {
      const scrollPosition = currentArcIndex * 144; // Approximate height of each arc
      
      // Add a slight delay to ensure the ScrollView is ready
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollPosition,
          animated: true
        });
      }, 500);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(122, 0, 243, 0.1)',
          'rgba(15, 15, 15, 1)',
          'rgba(255, 78, 78, 0.1)',
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.lineBackground} />
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer} />
        {arcs.map((arc, index) => (
          <ArcNode
            key={arc.id}
            arc={arc}
            isLast={index === arcs.length - 1}
          />
        ))}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  lineBackground: {
    position: 'absolute',
    left: 48,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'rgba(90, 90, 90, 0.2)',
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  spacer: {
    height: height * 0.4,
  },
  bottomSpacer: {
    height: height * 0.2,
  },
});