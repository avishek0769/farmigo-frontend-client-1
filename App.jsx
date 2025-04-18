import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from "./src/screens/Home"
import SplashScreen from "./src/screens/SplashScreen"
import UserTypeSelectionScreen from "./src/screens/UserTypeSelectionScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'react-native-reanimated'
import Shop from "./src/screens/Shop";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import 'react-native-gesture-handler'


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">

            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}