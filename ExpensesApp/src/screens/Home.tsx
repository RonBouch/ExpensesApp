import { observer } from 'mobx-react';
import React, { useCallback } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useExpensesStore } from "../store/ExpensesContext";
import _ from 'lodash';
import { Modal_Types } from '../services/Enums';

const Home = observer(() => {
    const { setModal, getDataAfterFilter, expensesData } = useExpensesStore();

    const getSum = useCallback(() =>
        expensesData.reduce((_this, val) => +_this + +val.amount, 0)
        , [expensesData])

    return (
        <View style={styles.container}>
            <View style={styles.titleCon}>
                <Text style={styles.title}>Total Expenses:</Text>
                <Text style={styles.sumExpenses}>${getSum().toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.filterBtn} onPress={() => setModal({ type: Modal_Types.Filter })}>
                <Text style={styles.filterTxt}>Filters</Text>
            </TouchableOpacity>

            {!_.isEmpty(getDataAfterFilter) ?
                Object.keys(getDataAfterFilter).map((key: string) => {
                    return (
                        <View key={key} style={styles.itemsCon}>
                            <View style={styles.dateCon}>
                                <Text style={styles.dateTxt}>{getDataAfterFilter[key][0].date}</Text>
                            </View>
                            {getDataAfterFilter[key].map((e: any, i: number) => {
                                return (
                                    <TouchableOpacity onPress={() => setModal({ type: Modal_Types.Edit, item: e })} key={e.name + e.amount + i + key} style={[styles.itemCon, i < getDataAfterFilter[key].length - 1 && styles.borderBottom]} >
                                        <Text style={styles.itemTxt}>{e.title}</Text>
                                        <Text style={styles.itemTxt}>${e.amount}</Text>
                                    </TouchableOpacity >
                                )
                            })}
                        </View>
                    )
                })
                :
                <Text style={styles.noRes}>No Results</Text>

            }
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


export default React.memo(Home);