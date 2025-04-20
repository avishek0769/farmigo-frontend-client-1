import * as React from "react";
import 'react-native-reanimated'
// import 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from "./src/screens/SplashScreen"
import UserTypeSelectionScreen from "./src/screens/UserTypeSelectionScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Cart from "./src/screens/Cart";
import { ContextProvider } from "./src/context/ContextProvider";
import Tabs from "./src/TabsNavigator";
import SearchResult from "./src/screens/SearchResults";
import ProductDetails from "./src/screens/ProductDetails";
import Checkout from "./src/screens/Checkout";


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }} >

              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="SearchResult" component={SearchResult} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen name="Checkout" component={Checkout} />

              <Stack.Screen name="Main" component={Tabs} />

            </Stack.Navigator>
          </NavigationContainer>
        </ContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}