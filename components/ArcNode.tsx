import React from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Arc } from '@/data/progressionData';

interface ArcNodeProps {
  arc: Arc;
  isLast: boolean;
}

export default function ArcNode({ arc, isLast }: ArcNodeProps) {
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (arc.status === 'current') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  const getColors = () => {
    switch (arc.status) {
      case 'completed':
        return ['rgba(122, 0, 243, 0.8)', 'rgba(122, 0, 243, 0.2)'];
      case 'current':
        return ['rgba(255, 78, 78, 0.8)', 'rgba(255, 78, 78, 0.2)'];
      default:
        return ['rgba(90, 90, 90, 0.8)', 'rgba(90, 90, 90, 0.2)'];
    }
  };

  const nodeScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.nodeContainer}>
          <Animated.View
            style={[
              styles.node,
              {
                transform: [{ scale: arc.status === 'current' ? nodeScale : 1 }],
                backgroundColor: arc.status === 'current' ? '#FF4E4E' : 
                               arc.status === 'completed' ? '#7A00F3' : '#5A5A5A'
              },
            ]}
          />
          {!isLast && <View style={[
            styles.line,
            { 
              backgroundColor: arc.status === 'locked' ? '#5A5A5A' : 
                             arc.status === 'completed' ? '#7A00F3' : '#FF4E4E'
            }
          ]} />}
        </View>

        <View style={[
          styles.arcContainer,
          {
            borderColor: arc.status === 'current' ? '#FF4E4E' : 
                        arc.status === 'completed' ? '#7A00F3' : '#5A5A5A'
          }
        ]}>
          <LinearGradient
            colors={getColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Image 
              source={{ uri: arc.imageUrl }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            
            <View style={styles.textContainer}>
              <Text style={styles.name}>{arc.name}</Text>
              <Text style={styles.description}>{arc.description}</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {arc.isCheckpoint && (
        <View style={styles.checkpointContainer}>
          <LinearGradient
            colors={['rgba(122, 0, 243, 0.2)', 'rgba(255, 78, 78, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkpointGradient}
          >
            <Text style={styles.checkpointText}>CHOOSE YOUR PATH</Text>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nodeContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  node: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#FF4E4E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  line: {
    width: 2,
    height: 100,
    marginTop: 8,
  },
  arcContainer: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    height: 120,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 15, 15, 0.6)',
  },
  textContainer: {
    padding: 16,
  },
  name: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 20,
    color: '#DCDCDC',
    marginBottom: 8,
    letterSpacing: 1,
  },
  description: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    color: '#DCDCDC',
    opacity: 0.7,
  },
  checkpointContainer: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  checkpointGradient: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(122, 0, 243, 0.3)',
  },
  checkpointText: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    color: '#DCDCDC',
    textAlign: 'center',
    letterSpacing: 2,
  },
});