import * as React from "react";
import 'react-native-reanimated'
// import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from "./src/screens/common/SplashScreen"
import UserTypeSelectionScreen from "./src/screens/common/UserTypeSelectionScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Cart from "./src/screens/buyers_side/Cart";
import { ContextProvider } from "./src/context/ContextProvider";
import SearchResult from "./src/screens/buyers_side/SearchResults";
import ProductDetails from "./src/screens/buyers_side/ProductDetails";
import Checkout from "./src/screens/buyers_side/Checkout";
import Login from "./src/screens/buyers_side/Login";
import Signup from "./src/screens/buyers_side/Signup";
import Wishlist from "./src/screens/buyers_side/Wishlist";
import BuyerTabs from "./src/BuyersTabsNavigator";
import SellerRegistration from "./src/screens/sellers_side/SellerRegistration";


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >

              {/* Common Screens */}
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
              {/* Buyer Side Screens */}
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Wishlist" component={Wishlist} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />

              <Stack.Screen name="BuyersTab" component={BuyerTabs} />

              {/* Seller Side Screens */}
              <Stack.Screen name="SellerRegistration" component={SellerRegistration} />



            </Stack.Navigator>
          </NavigationContainer>
        </ContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}