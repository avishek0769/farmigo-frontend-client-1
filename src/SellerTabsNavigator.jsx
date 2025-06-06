import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME_COLOR } from './constant';
import Account from './screens/sellers_side/Account';
import Analytics from './screens/sellers_side/Analytics';
import Chat from './screens/sellers_side/Chat';
import Dashboard from './screens/sellers_side/Dashboard';

const Tab = createBottomTabNavigator();

export default function SellersTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 63,
                    paddingTop: 6,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: THEME_COLOR,
                tabBarInactiveTintColor: '#6c757d',
            }}
        >
            <Tab.Screen
                name="SellerDashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="view-dashboard" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Analytics"
                component={Analytics}
                options={{
                    tabBarLabel: 'Analytics',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chart-line" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chat" size={size} color={color} />
                    ),
                    tabBarBadge: 3, // Add this if you want to show unread messages
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