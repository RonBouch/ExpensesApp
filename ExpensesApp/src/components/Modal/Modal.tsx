import React, { Component } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import { observer } from "mobx-react";
import { useExpensesStore } from "../../store/ExpensesContext";
import { Modal_Types } from "../../services/Enums";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ExpenseT } from "../../services/types";
import _ from "lodash";


const ModalComponent = observer(() => {
    const { modalData, setModal, addExpense, updateExpense, setFilterData, filterData } = useExpensesStore();
    const isFilterModal = modalData.type == Modal_Types.Filter;

    const onSubmit = (e: ExpenseT) => {
        const { Add, Edit, Filter } = Modal_Types
        switch (modalData.type) {
            case Add:
                addExpense(e)
                setModal({ type: "" })
                break;
            case Edit:
                updateExpense(e)
                setModal({ type: "" })
                break;
            case Filter:
                setFilterData(e)
                setModal({ type: "" })
                break;
            default:
                setModal({ type: "" })
                break;
        }
    }

    const validationSchemaLogin = Yup.object().shape({
        title: modalData.type == Modal_Types.Filter ? Yup.string() : Yup.string().required(),
        amount: modalData.type == Modal_Types.Filter ? Yup.string() : Yup.string().required(),
        date: modalData.type == Modal_Types.Filter ? Yup.string() : Yup.string().required()
    });


    const RenderModal = () => {
        const title = (modalData.type == Modal_Types.Add ? 'Create Expense' : modalData.type == Modal_Types.Edit ? "Edit Expense" : "Filters")
        const btnTxt = modalData.type == Modal_Types.Add ? 'Create' : modalData.type == Modal_Types.Edit ? "Save" : "Filter"
        const initialValues = filterData && Modal_Types.Filter == modalData.type ? filterData : Modal_Types.Edit == modalData.type && modalData.item ? modalData.item : { title: '', amount: '', date: '' }
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchemaLogin}>
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    validateField,
                    values,
                    touched,
                    errors,
                    setFieldTouched,
                    resetForm
                }) => {
                    return (
                        <View
                            style={[s.modalCon, isFilterModal && s.filterModalCon]}
                        >
                            <View style={s.headerCon}>
                                {isFilterModal ? <TouchableOpacity style={s.cleanBtn} onPress={() => resetForm()}><Text style={s.clean}>clean</Text></TouchableOpacity> : <View />}
                                <Text style={s.title}>{title}</Text>
                                <TouchableOpacity style={s.closeIcon} onPress={() => setModal({ type: '' })}><Text>Close</Text></TouchableOpacity>
                            </View>

                            <View style={s.totalCon}>
                                {touched.title && errors.title && <Text style={s.errMsg}>{errors.title}</Text>}
                                <TextInput
                                    style={s.txt}
                                    placeholder={'Enter Title'}
                                    value={values.title}
                                    onChangeText={handleChange('title')}
                                    onBlur={() => {
                                        setFieldTouched('title', true)
                                        handleBlur('title')
                                    }}
                                    keyboardType={'default'}
                                    onEndEditing={() => {
                                        validateField('title');
                                    }}
                                />
                            </View>

                            <View style={s.totalCon}>
                                {touched.amount && errors.amount && <Text style={s.errMsg}>{errors.amount}</Text>}
                                <TextInput
                                    style={s.txt}
                                    placeholder={'Enter Amount'}
                                    value={values.amount}
                                    onChangeText={handleChange('amount')}
                                    onBlur={() => {
                                        setFieldTouched('amount', true)
                                        handleBlur('amount')
                                    }}
                                    keyboardType={'numeric'}
                                    onEndEditing={() => {
                                        validateField('amount');
                                    }}
                                />
                            </View>

                            <View style={s.totalCon}>
                                {touched.date && errors.date && <Text style={s.errMsg}>{errors.date}</Text>}
                                <TextInput
                                    style={s.txt}
                                    placeholder={'Enter Date'}
                                    value={values.date}
                                    onChangeText={handleChange('date')}
                                    onBlur={() => {
                                        setFieldTouched('date', true)
                                        handleBlur('date')
                                    }}
                                    keyboardType={'default'}
                                    onEndEditing={() => {
                                        validateField('date');
                                    }}
                                />
                            </View>

                            < TouchableOpacity style={s.btnLogin} onPress={(e: any) => handleSubmit(e)}>
                                <Text style={s.btnLoginTxt}>{btnTxt}</Text>
                            </TouchableOpacity >
                        </View>
                    )
                }
                }
            </Formik >
        )
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={!!modalData.type}
            onRequestClose={() => {
                setModal({ type: '' });
            }}>

            {modalData.type ? <RenderModal /> : <View />}
        </Modal>


    )
})

export default React.memo(ModalComponent);
const s = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalCon: {
        backgroundColor: 'white',
        height: '86%',
        borderRadius: 30,
        position: 'absolute',
        zIndex: 9999,
        width: '100%',
        bottom: 0,
        alignItems: 'center',
        padding: 20
    },
    filterModalCon: {
        height: '60%',
    },
    headerCon: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cleanBtn: {
        position: 'absolute',
        top: 6,
        left: 20,
    },
    clean: {
        color: '#455EFF',
        fontSize: 14
    },
    closeIcon: {
        position: 'absolute',
        top: 6,
        right: 20,
    },
    totalCon: {
        width: '100%',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        marginTop: 16
    },
    txt: {
        padding: 16,
        fontSize: 20,
    },
    errMsg: {
        fontSize: 14,
        color: 'red'
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
})