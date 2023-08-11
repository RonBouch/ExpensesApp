import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity, TextInput } from 'react-native';

const Login = () => {
    const navigation = useNavigation()
    const [name, setName] = useState('');

    useEffect(() => {
    }, [])


    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Enter Name" />

            <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.btnLoginTxt}>Click</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderColor: "gray",
        width: "80%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
    },
    btnLogin: {
        backgroundColor: '#5B58AD',
        width: 148,
        height: 48,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100
    },
    btnLoginTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }

});


export default Login;