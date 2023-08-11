import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import DrawerNavigator from './DrawerNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SCREENS } from '../utilities/enum';
import { Login, Home, Profile, EditPage } from '../screens';
import TabsNavigator from './TavNavigator';
import { observer } from 'mobx-react';
import { useExpensesStore } from '../store/ExpensesContext';
import Modal from '../components/Modal/Modal';

export type RootStackParam = {
    Login: any;
    Home: any;
    Profile: any;
    EditPage: any
};
const Stack = createNativeStackNavigator<RootStackParam>();


const RootNavigator = observer(() => {
    const { name } = useExpensesStore();

    return (
        <React.Fragment>
            <NavigationContainer >
                <Stack.Navigator initialRouteName={'Home'} screenOptions={{ title: ("Login" || name) }}>
                    <Stack.Screen name={'Home'} component={TabsNavigator} />
                    <Stack.Screen name={'Login'} component={Login} />
                    <Stack.Screen name={'Profile'} component={Profile} />
                    <Stack.Screen name={'EditPage'} component={EditPage} />
                </Stack.Navigator >
            </NavigationContainer>
            <Modal />
        </React.Fragment>
    );
})

export default RootNavigator;