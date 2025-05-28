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

  const getLineGradient = () => {
    if (arc.status === 'locked') {
      return ['#5A5A5A', '#5A5A5A'];
    } else if (arc.status === 'completed') {
      return ['#7A00F3', '#7A00F3'];
    } else {
      return ['#FF4E4E', '#FF4E4E'];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.lineContainer}>
          {!isLast && (
            <LinearGradient
              colors={getLineGradient()}
              style={styles.line}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Animated.View 
                style={[
                  styles.glowLine,
                  {
                    backgroundColor: arc.status === 'current' ? '#FF4E4E' : 
                                   arc.status === 'completed' ? '#7A00F3' : '#5A5A5A',
                    opacity: arc.status === 'current' ? pulseAnim : 0.5
                  }
                ]}
              />
            </LinearGradient>
          )}
          
          <Animated.View
            style={[
              styles.nodeOuter,
              {
                transform: [{ scale: arc.status === 'current' ? nodeScale : 1 }],
                borderColor: arc.status === 'current' ? '#FF4E4E' : 
                           arc.status === 'completed' ? '#7A00F3' : '#5A5A5A'
              },
            ]}
          >
            <Animated.View
              style={[
                styles.node,
                {
                  backgroundColor: arc.status === 'current' ? '#FF4E4E' : 
                                 arc.status === 'completed' ? '#7A00F3' : '#5A5A5A'
                },
              ]}
            />
          </Animated.View>
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
  lineContainer: {
    alignItems: 'center',
    width: 60,
    height: 120,
  },
  nodeOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 15, 0.8)',
    zIndex: 2,
  },
  node: {
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#FF4E4E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  line: {
    position: 'absolute',
    width: 4,
    height: 144,
    top: -12,
    left: 28,
    zIndex: 1,
    overflow: 'hidden',
  },
  glowLine: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
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
});