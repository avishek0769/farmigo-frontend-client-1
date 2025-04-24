// Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './screens/buyers_side/Home';
import Products from './screens/buyers_side/Products';
import Account from './screens/buyers_side/Account';
import Order from './screens/buyers_side/Order';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Products':
                            iconName = 'store';
                            break;
                        case 'Order':
                            iconName = 'local-shipping';
                            break;
                        case 'Account':
                            iconName = 'person';
                            break;
                    }

                    return <Icon name={iconName} size={28} color={color} />;
                },
                tabBarActiveTintColor: "#000",
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '600',
                    letterSpacing: 0.5,
                },
                tabBarStyle: {
                    height: 58
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Products" component={Products} />
            <Tab.Screen name="Order" component={Order} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    );
}
