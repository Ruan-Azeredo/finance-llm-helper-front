import { AxiosResponse, AxiosError } from "axios";
import { createContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { default_categories } from "../components/const/default_categories";
import { Category } from "../schemas/Category";
import { errorToast, successToast } from "../components/toasts";

import useAxiosAuth from "../hooks/useAxiosAuth";

interface RequisitionsManagerContextType { 
    respData: AxiosResponse | AxiosError | null
    saveTransactions: (transactions: Transaction[]) => void
    getAllTransactions: () => void
    categories: Category[]
    add_transaction: (transaction: Transaction) => void
    update_transaction: (transaction: Transaction) => void
    delete_transaction: (transaction: Transaction) => void
}

export const RequisitionsManagerContext = createContext<RequisitionsManagerContextType>({
    respData: null,
    saveTransactions: () => {},
    getAllTransactions: () => {},
    categories: [],
    add_transaction: () => {},
    update_transaction: () => {},
    delete_transaction: () => {}
});

export function RequisitionsManagerProvider({ children } : { children: React.ReactNode }) {

    const api = useAxiosAuth()

    const [respData, setRespData] = useState<AxiosResponse | AxiosError | null>(null)

    const [currentDashboardTransactions, setCurrentDashboardTransactions] = useState<Transaction[]>([])
    const [dataCache, setDataCache] = useState<{
        monthsData: {monthName: string, transactions: Transaction[]}[]
        yearsData: {year: number, transactions: Transaction[]}[]
    }>([])


    const saveTransactions = async (transactions: Transaction[]) => {
        try {
            const response = await api.post('/transaction/create-many-transactions/1', transactions,
                {
                headers: { "Content-Type": "application/json" } // ✅ Explicitly set headers
                }
            )
            successToast(response)
        } catch (error) {
            errorToast(error)
        }
    }

    const getAllTransactions = async () => {
        try {
            const response = await api.get('/transaction/from-user/1')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getTransactionsByCategorizedFile = async (formData: FormData) => {
        try {
            const response = await api.post('/categorize-transaction/by-file', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getTransactionsByTimeRange = async (startTimestemps: number, endTimestemps: number) => {
        try {
            const response = await api.get(`/transaction/from-user/1?start_date=${startTimestemps}&end_date=${endTimestemps}`)
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