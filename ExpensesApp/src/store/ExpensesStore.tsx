import { makeAutoObservable } from "mobx"
import { ExpenseT, ModalT, PropT } from "../services/types"
import React from "react";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isHydrated, makePersistable } from "mobx-persist-store";

export default class ExpensesStore implements PropT {
    name: string;
    modalData: ModalT;
    expensesData: ExpenseT[];
    filterData: ExpenseT | null;
    dataAfterFilter: { [name: string]: ExpenseT[] } | {};

    constructor() {
        this.name = '';
        this.modalData = { type: '' };
        this.expensesData = []
        this.filterData = null;
        this.dataAfterFilter = {}

        makeAutoObservable(this);

        makePersistable(this, { name: 'ExpensesStore', properties: ['name', 'expensesData'], storage: AsyncStorage });

    }
    get isHydrated() {
        return isHydrated(this);
    }

    logout = () => {
        this.name = '';
        this.modalData = { type: '' };
        this.expensesData = []
        this.filterData = null;
        this.dataAfterFilter = {}
    }

    get getDataAfterFilter() {
        let originalData = this.expensesData.slice()
        let newData: { [name: string]: ExpenseT[] } | ExpenseT[] = []
        if (this.filterData) {
            newData = originalData.slice().filter((f: ExpenseT) => this.filterData?.amount == f.amount || f.date == this.filterData?.date || this.filterData?.title == f.title)
            newData = _.groupBy(newData.slice(), 'date')
            return newData;
        }
        else {
            newData = _.groupBy(originalData.slice(), 'date')
            return newData
        }
    }

    setFilterData = (state: ExpenseT) => {
        if (!state.amount && !state.date && !state.title) this.filterData = null
        else this.filterData = state;
    }

    addExpense = (state: ExpenseT) => {
        let newData = {
            ...state,
            id: (this.expensesData[this.expensesData.length - 1]?.id || 1) + 1
        }
        this.expensesData.push(newData)
    }

    updateExpense = (state: ExpenseT) => {
        let index = this.expensesData?.findIndex(e => e.id == state.id)
        if (index >= 0)
            this.expensesData[index] = state
    }

    setName = (state: string) => {
        this.name = state;
    };

    setModal = (state: ModalT) => {
        this.modalData = state;
    };
}
