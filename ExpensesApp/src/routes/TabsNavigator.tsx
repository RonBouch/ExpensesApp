import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native'
import { Home, Profile } from '../screens';
import { useExpensesStore } from '../store/ExpensesContext';
import { Modal_Types } from '../services/Enums';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    const { setModal } = useExpensesStore()
    return (
        <Tab.Navigator
            initialRouteName='My Home'
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                // tabBarInactiveTintColor: 'white',
            }} >
            <Tab.Screen
                name='Home Page'
                component={Home}
                options={{ tabBarIcon: () => (<Image style={styles.img} source={require('../assets/images/home.png')} />) }} />
            <Tab.Screen
                name='Edit Page'
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (<Image style={styles.plusImg} source={require('../assets/images/plus.png')} />)
                }}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault()

                        setModal({ type: Modal_Types.Add })
                    },
                })}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{ tabBarIcon: () => (<Image style={styles.img} source={require('../assets/images/user.png')} />) }} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 24,
        height: 24,
    },
    plusImg: {
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 6
    },
    tabBarStyle: { backgroundColor: 'white' },
})
export default TabsNavigator;