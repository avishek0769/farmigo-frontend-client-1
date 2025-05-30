import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from './constant';
import Account from './screens/buyers_side/Account';
import Home from './screens/buyers_side/Home';
import Order from './screens/buyers_side/Order';
import Products from './screens/buyers_side/Products';

const Tab = createBottomTabNavigator();

export default function BuyersTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 63,
                    paddingTop: 4,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: THEME_COLOR,
                tabBarInactiveTintColor: '#6c757d',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Products"
                component={Products}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="store" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Order"
                component={Order}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="truck-delivery" size={size} color={color} />
                    ),
                    tabBarBadge: 2, // Optional: Show number of active orders
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="account" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}