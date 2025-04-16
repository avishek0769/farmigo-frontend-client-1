import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { MotiView, MotiText } from 'moti';

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Classic Oxford Shirt',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
    },
    {
      id: 2,
      name: 'Linen Summer Shirt',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800',
    },
    {
      id: 3,
      name: 'Organic Cotton Shirt',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=800',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John D.',
      text: 'The quality and fit of Urban Threads shirts are unmatched. Sustainable fashion never looked so good!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    },
    {
      id: 2,
      name: 'Michael R.',
      text: 'Finally found shirts that align with my values. The sustainable approach and premium quality make these my go-to choice.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    },
  ];

  return (
    <ScrollView>
      {/* Hero Section */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920' }}
        style={styles.heroSection}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.heroContent}>
          <View style={styles.heroTextWrapper}>
            <MotiText from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} style={styles.heroTitle}>
              Sustainable Style for the Modern Man
            </MotiText>
            <MotiText from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 200 }} style={styles.heroSubtitle}>
              Ethically made shirts that look good, feel good, and do good.
            </MotiText>
            <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 400 }}>
              <TouchableOpacity style={styles.shopNowBtn} onPress={() => navigation.navigate('Shop')}>
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </MotiView>
          </View>
        </View>
      </ImageBackground>

      {/* Featured Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <View style={styles.grid3}>
          {featuredProducts.map((product) => (
            <MotiView
              key={product.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              style={styles.productCard}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Product', { id: product.id })}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </TouchableOpacity>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </MotiView>
          ))}
        </View>
      </View>

      {/* Testimonials */}
      <View style={[styles.sectionContainer, { backgroundColor: '#f2f2f2' }]}>
        <Text style={styles.sectionTitle}>What Our Customers Say</Text>
        <View style={styles.grid2}>
          {testimonials.map((testimonial) => (
            <MotiView
              key={testimonial.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              style={styles.testimonialCard}
            >
              <View style={styles.testimonialHeader}>
                <Image source={{ uri: testimonial.image }} style={styles.testimonialAvatar} />
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
              </View>
              <Text style={styles.testimonialText}>{testimonial.text}</Text>
            </MotiView>
          ))}
        </View>
      </View>

      {/* Sustainability Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.grid2}>
          <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            style={styles.sustainabilityTextBlock}
          >
            <Text style={styles.sustainabilityHeading}>Wear Your Bold – Prints That Speak</Text>
            <Text style={styles.sustainabilityPara}>
              Discover original, in-house designed prints that reflect your vibe. Every shirt is a canvas of creativity, made to turn heads.
            </Text>
            <View>
              {['Original Designs Only', 'Printed on Premium Fabric', 'Sustainable Style'].map((item, index) => (
                <View key={index} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            style={styles.imageRightContainer}
          >
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1471421298428-1513ab720a8e' }}
              style={styles.sustainabilityImage}
            />
          </MotiView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    height: '80%',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextWrapper: {
    maxWidth: 600,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  shopNowText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  grid2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '30%',
    marginBottom: 24,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  productName: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    color: '#4f46e5',
  },
  testimonialCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  testimonialName: {
    marginLeft: 12,
    fontWeight: 'bold',
  },
  testimonialText: {
    color: '#4B5563',
  },
  sustainabilityTextBlock: {
    flex: 1,
    gap: 12,
  },
  sustainabilityHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 48,
  },
  sustainabilityPara: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bulletDot: {
    width: 8,
    height: 8,
    backgroundColor: '#4f46e5',
    borderRadius: 4,
    marginRight: 8,
  },
  bulletText: {
    fontSize: 16,
  },
  imageRightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sustainabilityImage: {
    width: 300,
    height: 300,
    borderRadius: 16,
  },
});

export default Home;