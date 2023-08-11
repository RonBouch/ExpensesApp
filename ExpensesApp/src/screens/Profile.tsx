import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useExpensesStore } from '../store/ExpensesContext';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const { expensesData, logout } = useExpensesStore();
    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <View style={styles.totalCon}>
                <Text style={styles.txt}  >TotalExpense Items:</Text>
                <Text style={styles.txt}  >{expensesData.length}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                logout()
                navigation.navigate("Login")
            }} style={styles.totalCon}>
                <Text style={styles.txt}  >Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center'
    },
    totalCon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        marginTop: 16
    },
    txt: {
        lineHeight: 60,
        fontSize: 20,
    },
});


export default Profile;