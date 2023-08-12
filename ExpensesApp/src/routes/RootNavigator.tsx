import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Profile } from '../screens';
import TabsNavigator from './TabsNavigator';
import { observer } from 'mobx-react';
import { useExpensesStore } from '../store/ExpensesContext';
import Modal from '../components/Modal/Modal';

const Stack = createNativeStackNavigator();


const RootNavigator = observer(() => {
    const { name } = useExpensesStore();

    return (
        <React.Fragment>
            <NavigationContainer >
                <Stack.Navigator initialRouteName={'Login'} screenOptions={{ title: (name || 'Login'),  headerBackVisible: false }}>
                    <Stack.Screen name={'Home'} component={TabsNavigator} />
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'Profile'} component={Profile} />
                </Stack.Navigator >
            </NavigationContainer>
            <Modal />
        </React.Fragment>
    );
})

export default RootNavigator;