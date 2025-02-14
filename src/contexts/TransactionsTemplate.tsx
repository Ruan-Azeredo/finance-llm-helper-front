import { createContext, useEffect, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { fake_transactions } from "../components/const/fake_transactions";

interface TransactionsTemplateContextType {

    transactionsTemplate: Transaction[];
    setTransactionsTemplate: React.Dispatch<React.SetStateAction<Transaction[]>>;
    add_transaction: (transaction: Transaction) => void;
    update_transaction: (transaction: Transaction) => void;
    delete_transaction: (transaction: Transaction) => void;

}

export const TransactionsTemplateContext = createContext<TransactionsTemplateContextType>({
    transactionsTemplate: [],
    setTransactionsTemplate: () => {},
    add_transaction: () => {},
    update_transaction: () => {},
    delete_transaction: () => {}
});

export function TransactionsTemplateProvider({ children } : { children: React.ReactNode }) {

    const [transactionsTemplate, setTransactionsTemplate] = useState<Transaction[]>([])

    // use fake transactions
    useEffect(() => {
        setTransactionsTemplate(fake_transactions)
    }, [])

    const add_transaction = (transaction: Transaction) => {
        setTransactionsTemplate([...transactionsTemplate, transaction])
    }
    
    const update_transaction = (transaction: Transaction) => {
        setTransactionsTemplate(transactionsTemplate.map((item) => item.id === transaction.id ? transaction : item))
    }

    const delete_transaction = (transaction: Transaction) => {
        setTransactionsTemplate(transactionsTemplate.filter((transact) => transact.id !== transaction.id))
    }

    return (
        <TransactionsTemplateContext.Provider value={{
            transactionsTemplate,
            setTransactionsTemplate,
            add_transaction,
            update_transaction,
            delete_transaction
        }}>
            {children}
        </TransactionsTemplateContext.Provider>
    )
}