import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from "./src/screens/Home"
import SplashScreen from "./src/screens/SplashScreen"

import 'react-native-reanimated'
// import 'react-native-gesture-handler'


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>

        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}