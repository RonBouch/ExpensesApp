import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity } from 'react-native';
// import { ExpensesContext } from '../store/ExpensesContext';
import { useExpensesStore } from "../store/ExpensesContext";
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { Modal_Types } from '../services/Enums';

const Home = observer(() => {
    const { name, setName, setModal } = useExpensesStore();
    const navigation = useNavigation()
    const [expenseData, setExpenseData] = useState<any>({})
    const data = [
        { date: "28.07.2022", name: 'Some expense', sum: 230 },
        { date: "28.07.2022", name: 'Some expense2', sum: 600 },
        { date: "27.07.2022", name: 'Some expense', sum: 210 }
    ]

    useEffect(() => {
        if (data) {
            let newData = _.groupBy(data.slice(), 'date')
            console.log("🚀 ~ file: Home.tsx:22 ~ useEffect ~ newData:", newData)
            setExpenseData(newData)
        }
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.titleCon}>
                <Text style={styles.title}>Total Expenses:</Text>
                <Text style={styles.sumExpenses}>$1,024.00</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setModal(Modal_Types.Filter)}>
                <Text style={styles.filterTxt}>Filters</Text>
            </TouchableOpacity>

            {!_.isEmpty(expenseData) && Object.keys(expenseData).map((key: string) => {
                return (
                    <View key={key} style={styles.itemsCon}>
                        <View style={styles.dateCon}>
                            <Text style={styles.dateTxt}>{expenseData[key][0].date}</Text>
                        </View>
                        {expenseData[key].map((e: any, i: number) => {
                            return (
                                <TouchableOpacity onPress={() => setModal(Modal_Types.Edit)} key={e.name + i + key} style={[styles.itemCon, i < expenseData[key].length - 1 && styles.borderBottom]} >
                                    <Text style={styles.itemTxt}>{e.name}</Text>
                                    <Text style={styles.itemTxt}>${e.sum}</Text>
                                </TouchableOpacity >
                            )
                        })}

                    </View>
                )
            })}
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleCon: {
        flexDirection: 'row',
        padding: 6,
        marginTop: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    sumExpenses: {
        fontSize: 20,
        marginLeft: 16
    },
    filterBtn: {
        backgroundColor: '#D9D9D9',
        width: 94,
        height: 28,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        margin: 12,
        marginTop: 24


    },
    filterTxt: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    itemsCon: {
    },

    itemTxt: {
        fontSize: 18
    },
    dateCon: {
        width: '100%',
        height: 25,
        backgroundColor: '#F4EEEE',
        justifyContent: 'center',
        paddingLeft: 16
    },
    dateTxt: {
        fontSize: 16
    },

    itemCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    borderBottom: {
        borderBottomWidth: 1,

    },
    flatlistCon: {
        marginTop: 20,
        marginBottom: 20,
    },
    noRes: {
        color: 'rgb(151,145,145)',
        fontSize: 28,
        alignSelf: 'center',
        marginTop: 30,
    },
})


export default Home;