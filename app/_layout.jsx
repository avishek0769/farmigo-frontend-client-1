// import 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BuyersTabs from "../src/BuyersTabsNavigator";
import { ContextProvider } from "../src/context/ContextProvider";
import Cart from "../src/screens/buyers_side/Cart";
import Checkout from "../src/screens/buyers_side/Checkout";
import Login from "../src/screens/buyers_side/Login";
import ProductDetails from "../src/screens/buyers_side/ProductDetails";
import SearchScreen from "../src/screens/buyers_side/Search";
import SearchResult from "../src/screens/buyers_side/SearchResults";
import Signup from "../src/screens/buyers_side/Signup";
import Wishlist from "../src/screens/buyers_side/Wishlist";
import SplashScreen from "../src/screens/common/SplashScreen";
import UserTypeSelectionScreen from "../src/screens/common/UserTypeSelectionScreen";
import ProductRequestDetails from "../src/screens/sellers_side/ProductRequestDetails";
import SellerRegistration from "../src/screens/sellers_side/SellerRegistration";
import SellersTabs from "../src/SellerTabsNavigator";


export default function Layout() {
  const Stack = createNativeStackNavigator()
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('../src/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../src/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../src/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../src/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../src/assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Italic': require('../src/assets/fonts/Poppins-Italic.ttf'),
  });


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#fff", }}>
      {/* <PaperProvider theme={theme}> */}
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={[]}>
            <ContextProvider>
              <StatusBar translucent backgroundColor="transparent" style="dark" />

              {/* <NavigationContainer> */}
              <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }} >

                {/* Common Screens */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />

                {/* Buyer Side Screens */}
                <Stack.Screen name="BuyersTab" component={BuyersTabs} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="SearchResult" component={SearchResult} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Wishlist" component={Wishlist} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />

                {/* Seller Side Screens */}
                <Stack.Screen name="SellerRegistration" component={SellerRegistration} />
                <Stack.Screen name="ProductRequestDetails" component={ProductRequestDetails} />
                <Stack.Screen name="SellersTab" component={SellersTabs} />

              </Stack.Navigator>
              {/* </NavigationContainer> */}
            </ContextProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      {/* </PaperProvider> */}
    </GestureHandlerRootView >
  )
}