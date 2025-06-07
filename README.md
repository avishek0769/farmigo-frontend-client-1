# Farmigo 🌱

A comprehensive mobile application connecting farmers, buyers, and sellers in the agricultural ecosystem. Built with React Native, Farmigo facilitates seamless trading of agricultural products, tools, and services.

## 📱 Features

### For Buyers
- **Product Discovery**: Browse extensive catalog of agricultural products
- **Smart Search**: Advanced search with suggestions and filters
- **Product Details**: Comprehensive product information with images and reviews
- **Shopping Cart**: Easy cart management with quantity controls
- **Order Tracking**: Real-time order status and delivery tracking
- **Wishlist**: Save favorite products for future purchase
- **User Reviews**: Rate and review products
- **Location Services**: Auto-detect location for delivery

### For Sellers
- **Business Dashboard**: Comprehensive overview of sales and analytics
- **Product Management**: Add, edit, and manage product listings
- **Order Management**: Track and fulfill customer orders
- **Request Handling**: Respond to buyer product requests
- **Chat Support**: Direct communication with buyers and admin
- **Analytics**: Sales performance and business insights
- **Profile Management**: Business information and verification

### Common Features
- **User Authentication**: Secure login and registration
- **Real-time Chat**: Support chat system
- **Notifications**: Push notifications for orders and updates
- **Multi-language Support**: Localized content
- **Dark/Light Theme**: User preference themes
- **Offline Support**: Basic functionality without internet

## 🛠️ Tech Stack

- **Framework**: React Native
- **Navigation**: React Navigation
- **State Management**: React Context API
- **UI Components**: Custom components with MaterialCommunityIcons
- **Animations**: Moti for smooth animations
- **Styling**: StyleSheet with custom themes
- **Image Handling**: React Native Image components
- **Document Picker**: Expo Document Picker
- **Location Services**: Custom location detection
- **Gradients**: Expo Linear Gradient

## 📁 Project Structure

```
src/
├── assets/                    # Static assets
│   ├── fonts/                # Poppins font family
│   ├── icons/                # App icons and images
│   └── images/               # Carousel and promotional images
├── components/               # Reusable components
│   ├── buyers_side/          # Buyer-specific components
│   │   ├── Header.jsx        # Main navigation header
│   │   ├── ProductCard.jsx   # Product display card
│   │   ├── OrderCard.jsx     # Order display card
│   │   ├── Filters.jsx       # Product filtering
│   │   └── ...
│   ├── sellers_side/         # Seller-specific components
│   │   ├── SellersHeader.jsx # Seller navigation
│   │   ├── ProductRequestCard.jsx
│   │   └── ...
│   └── common/               # Shared components
│       ├── ErrorPopup.jsx    # Error handling
│       ├── ModalPopUp.jsx    # Modal dialogs
│       └── Separator.jsx     # UI separators
├── context/                  # Global state management
│   └── ContextProvider.jsx   # App context provider
├── screens/                  # Screen components
│   ├── buyers_side/          # Buyer screens
│   │   ├── Home.jsx          # Main homepage
│   │   ├── Products.jsx      # Product listing
│   │   ├── ProductDetails.jsx # Product details
│   │   ├── Search.jsx        # Search functionality
│   │   ├── SearchResults.jsx # Search results
│   │   ├── Order.jsx         # Order history
│   │   ├── Wishlist.jsx      # Saved products
│   │   ├── Account.jsx       # User profile
│   │   └── ...
│   ├── sellers_side/         # Seller screens
│   │   ├── Dashboard.jsx     # Seller dashboard
│   │   ├── Analytics.jsx     # Business analytics
│   │   ├── Chat.jsx          # Support chat
│   │   ├── Account.jsx       # Seller profile
│   │   └── ...
│   └── common/               # Shared screens
│       └── SplashScreen.jsx  # App splash screen
├── utils/                    # Utility functions
│   └── DetectLocation.js     # Location services
├── BuyersTabsNavigator.jsx   # Buyer tab navigation
├── SellerTabsNavigator.jsx   # Seller tab navigation
└── constant.js               # App constants
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or later)
- React Native CLI
- Android Studio / Xcode
- Expo CLI (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/avishek0769/farmigo-frontend-client-1.git
   cd farmigo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   For Android:
   ```bash
   npx expo run:android
   ```
   
   For iOS:
   ```bash
   npx expo run:ios
   ```


## 📖 Key Components

### Navigation Structure
- **BuyersTabsNavigator**: Bottom tab navigation for buyers
- **SellerTabsNavigator**: Bottom tab navigation for sellers
- **Nested Stack Navigation**: For detailed screens

### State Management
- **ContextProvider**: Global state for user authentication and data
- **Local State**: Component-level state for UI interactions

### Core Features Implementation

#### Infinite Scroll
Implemented across multiple screens:
- Products listing
- Search results  
- Order history
- Home page product feeds

#### Search Functionality
- Real-time search suggestions
- Category-based filtering
- Recent search history
- Popular searches

#### File Upload
- Document picker integration
- Image preview for uploads
- PDF file support
- File validation

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Green-based agricultural theme (#0bb305)
- **Typography**: Poppins font family
- **Icons**: Material Community Icons
- **Gradients**: Subtle linear gradients for depth

### Responsive Design
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Accessibility considerations

### Animations
- Smooth transitions with Moti
- Loading states and skeletons
- Interactive feedback

## 🔧 Development Guidelines

### Code Structure
- Functional components with React Hooks
- Custom hooks for reusable logic
- Modular component architecture
- Consistent naming conventions

### Styling Approach
- StyleSheet for performance
- Component-specific styles
- Shared constants for colors and themes
- Responsive design patterns

### Best Practices
- Error boundary implementation
- Loading state management
- Optimistic UI updates
- Performance optimization

## 🌟 Key Screens Overview

### Buyer Experience
1. **Home**: Product discovery with carousels and categories
2. **Products**: Filterable product listing with infinite scroll
3. **Search**: Smart search with suggestions and filters
4. **Product Details**: Comprehensive product information
5. **Orders**: Order tracking and history
6. **Account**: Profile management and settings

### Seller Experience
1. **Dashboard**: Business overview and product requests
2. **Analytics**: Sales performance metrics
3. **Chat**: Customer and admin communication
4. **Account**: Business profile and settings

## 📱 Platform Support

- **Android**: API level 21+
- **iOS**: iOS 11+
- **React Native**: 0.72+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and queries:
- Email: support@farmigo.app
- Documentation: [docs.farmigo.app](https://docs.farmigo.app)
- Issues: [GitHub Issues](https://github.com/yourusername/farmigo/issues)

## 🚗 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Machine learning recommendations
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] GPS-based delivery tracking
- [ ] Video product previews
- [ ] Social features and community

---

**Farmigo** - Connecting the agricultural ecosystem, one tap at a time. 🌾