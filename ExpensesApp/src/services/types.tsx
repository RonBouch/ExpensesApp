
export interface PropT {
    name: string;
    modalData: ModalT;
    expensesData: ExpenseT[];
    filterData: ExpenseT | null;
    dataAfterFilter: { [name: string]: ExpenseT[] } | {};
}

export interface InputT {
    errorMsg: string | undefined;
    type: string;
    value: string;
    placeholder: string
    touched: boolean;
}

export interface ExpenseT {
    title: string;
    amount: string;
    id?: number;
    date: string;
}
export interface ModalT {
    type: string;
    item?: ExpenseT;
}