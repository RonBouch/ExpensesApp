
export interface PropT {
    name: string;
    isUserLogin: boolean;
    modalType: string;
    expensesData: ExpenseT[];
}

export interface InputT {
    errorMsg: string | undefined;
    type: string;
    value: string;
    placeholder: string
}

export interface ExpenseT {
    title: string;
    amount: string;
    id?: number;
    date: string;
}