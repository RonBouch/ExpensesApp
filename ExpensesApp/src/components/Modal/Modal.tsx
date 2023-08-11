import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity, TextInput } from "react-native";
import { observer } from "mobx-react";
import { useExpensesStore } from "../../store/ExpensesContext";
import { Modal_Types } from "../../services/Enums";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ExpenseT, InputT } from "../../services/types";


const ModalComponent = observer(() => {
    const { modalType, setModal, addExpense, updateExpense } = useExpensesStore();

    const onSubmit = (e: ExpenseT) => {
        const { Add, Edit, Filter } = Modal_Types
        console.log("🚀 ~ file: Modal.tsx:15 ~ onSubmit ~ e:", e)
        switch (modalType) {
            case Add:
                addExpense(e)
            case Edit:
                updateExpense(e)
            default:
                break;
        }
        // setModal("")
    }

    const validationSchemaLogin = Yup.object().shape({
        title: Yup.string().required(),
        amount: Yup.string().required(),
        date: Yup.string().required()
    });


    const RenderModal = () => {
        const title = (modalType == Modal_Types.Add ? 'Create Expense' : modalType == Modal_Types.Edit ? "Edit Expense" : "Filters")
        const btnTxt = modalType == Modal_Types.Add ? 'Create' : modalType == Modal_Types.Edit ? "Save" : "Filter"
        return (

            <Formik
                initialValues={{
                    title: '',
                    amount: '',
                    date: ''
                }}
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
                    validateForm

                }) => {

                    const CustomTextInput = ({ errorMsg, value, type, placeholder }: InputT) => {
                        return (
                            <View style={s.totalCon}>
                                {errorMsg && <Text style={s.errMsg}>{errorMsg}</Text>}
                                <TextInput
                                    style={s.txt}
                                    placeholder={placeholder}
                                    value={value}
                                    onChangeText={handleChange(type)}
                                    onBlur={() => {
                                        setFieldTouched(type, true)
                                        handleBlur(type)
                                    }}
                                    keyboardType={'default'}
                                    onEndEditing={() => {
                                        validateField(type);
                                    }}
                                />
                            </View>)
                    }

                    return (
                        <View style={s.modalCon}>
                            <Text style={s.title}>{title}</Text>
                            <CustomTextInput
                                errorMsg={errors.title}
                                value={values.title}
                                type={'title'}
                                placeholder={"Enter Title"}
                            />
                            <CustomTextInput
                                errorMsg={errors.amount}
                                value={values.amount}
                                type={'amount'}
                                placeholder={"Enter Amount"}
                            />
                            <CustomTextInput
                                errorMsg={errors.date}
                                value={values.date}
                                type={'date'}
                                placeholder={"Enter Date"}
                            />



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
            visible={!!modalType}
            onRequestClose={() => {
                setModal('');
            }}>
            {modalType ? <RenderModal /> : <View />}
        </Modal>


    )
})

export default ModalComponent;
const s = StyleSheet.create({
    title: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: 'bold'
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
    centeredView: {
        flex: 1,
        width: '100%',
        height: 800,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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