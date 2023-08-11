import React, { useContext, useRef } from "react";
import ExpensesStore from "./ExpensesStore";

// 
const ExpensesContext = React.createContext<ExpensesStore>(
    null as unknown as ExpensesStore
);

export const useExpensesStore = () => useContext(ExpensesContext);

type Props = {
    children: React.ReactNode;
};

export function ExpensesProvider({ children }: Props) {
    const store = useRef(new ExpensesStore());

    return (
        <ExpensesContext.Provider value={store.current}>
            {children}
        </ExpensesContext.Provider>
    );
}