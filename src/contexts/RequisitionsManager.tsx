import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { AuthContext } from "./Auth";
import { default_categories } from "../components/const/default_categories";
import { Category } from "../schemas/Category";

interface RequisitionsManagerContextType { 
    instance: AxiosInstance | null
    respData: AxiosResponse | AxiosError | null
    saveTransactions: (transactions: Transaction[]) => void
    getAllTransactions: () => void
    categories: Category[]
    add_transaction: (transaction: Transaction) => void
    update_transaction: (transaction: Transaction) => void
    delete_transaction: (transaction: Transaction) => void
}

export const RequisitionsManagerContext = createContext<RequisitionsManagerContextType>({
    instance: null,
    respData: null,
    saveTransactions: () => {},
    getAllTransactions: () => {},
    categories: [],
    add_transaction: () => {},
    update_transaction: () => {},
    delete_transaction: () => {}
});

export function RequisitionsManagerProvider({ children } : { children: React.ReactNode }) {

    const { instance } = useContext(AuthContext)

    const [respData, setRespData] = useState<AxiosResponse | AxiosError | null>(null)

    const saveTransactions = async (transactions: Transaction[]) => {
        try {
            const response = await instance.post('/transaction/create-many-transactions/1', transactions,
                {
                headers: { "Content-Type": "application/json" } // ✅ Explicitly set headers
                }
            )
            console.log(response)
            setRespData(response)

            setTimeout(() => setRespData(null), 5000)
        } catch (error) {
            console.log(error)

            setTimeout(() => setRespData(null), 5000)
        }
    }

    const getAllTransactions = async () => {
        try {
            const response = await instance.get('/transaction/from-user/1')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const categories = default_categories

    const add_transaction = (transaction: Transaction) => {
        console.log('add_transaction', transaction)
    }
    
    const update_transaction = (transaction: Transaction) => {
        console.log('update_transaction', transaction)
    }

    const delete_transaction = (transaction: Transaction) => {
        console.log('delete_transaction', transaction)
    }

    return (
        <RequisitionsManagerContext.Provider value={{
            instance,
            respData,
            saveTransactions,
            getAllTransactions,
            categories,
            add_transaction,
            update_transaction,
            delete_transaction
        }}>
            {children}
        </RequisitionsManagerContext.Provider>
    )
}