import { makeObservable, observable, computed, action, flow } from "mobx"
import { ExpenseT, PropT } from "../services/types"
import React, { useContext, useRef } from "react";

export default class ExpensesStore implements PropT {
    isUserLogin: boolean;
    name: string;
    modalType: string;
    expensesData: ExpenseT[];

    constructor() {
        this.name = 'Ron';
        this.isUserLogin = false;
        this.modalType = '';
        this.expensesData = []

        makeObservable(this, {
            name: observable,
            isUserLogin: observable,
            modalType: observable,
            expensesData: observable,
            setName: action,
            setModal: action,
            updateExpense: action,
            addExpense: action
        })
    }


    addExpense = (state: ExpenseT) => {
        let newData = {
            ...state,
            id: (this.expensesData[this.expensesData.length - 1]?.id || 1) + 1
        }
        this.expensesData.push(newData)
    }

    updateExpense = (state: ExpenseT) => {
        console.log("🚀 ~ file: ExpensesStore.tsx:37 ~ ExpensesStore ~ state:", state)
        let index = this.expensesData?.findIndex(e => e.id == state.id)
        
        console.log("🚀 ~ file: ExpensesStore.tsx:36 ~ ExpensesStore ~ index:", index)
        // this.expensesData[index || 0] = state
    }

    setName = (state: string) => {
        this.name = state;
    };
    setModal = (state: string) => {
        this.modalType = state;
    };
}
