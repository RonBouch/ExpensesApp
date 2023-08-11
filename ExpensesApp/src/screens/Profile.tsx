import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity, TextInput } from 'react-native';

const Profile = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');

    useEffect(() => {
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.totalCon}>
                <Text style={styles.txt}  >TotalExpense Items:</Text>
                <Text style={styles.txt}  >3</Text>
            </View>
            <View style={styles.totalCon}>
                <Text style={styles.txt}  >Sign out</Text>
            </View>
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