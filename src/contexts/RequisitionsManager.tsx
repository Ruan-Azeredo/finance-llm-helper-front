import { AxiosError } from "axios";
import { createContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { default_categories } from "../components/const/default_categories";
import { Category } from "../schemas/Category";
import { errorToast, successToast } from "../components/toasts";

import useAxiosAuth from "../hooks/useAxiosAuth";

interface RequisitionsManagerContextType {
    saveTransactions: (transactions: Transaction[]) => void
    getAllTransactions: () => void
    categories: Category[]
    add_transaction: (transaction: Transaction) => void
    update_transaction: (transaction: Transaction) => void
    delete_transaction: (transaction: Transaction) => void
    getTransactionsByCategorizedFile: (formData: FormData) => void
    currentDashboardTransactions: Transaction[]
    getTransactionsByTimeRange: (startTimestemps: number, endTimestemps: number) => Promise<void>
}

export const RequisitionsManagerContext = createContext<RequisitionsManagerContextType>({
    saveTransactions: () => {},
    getAllTransactions: () => {},
    categories: [],
    add_transaction: () => {},
    update_transaction: () => {},
    delete_transaction: () => {},
    getTransactionsByCategorizedFile: () => {},
    currentDashboardTransactions: [],
    getTransactionsByTimeRange: async () => {},
});

export function RequisitionsManagerProvider({ children } : { children: React.ReactNode }) {

    const api = useAxiosAuth()

    const [currentDashboardTransactions, setCurrentDashboardTransactions] = useState<Transaction[]>([])
    /* const [dataCache, setDataCache] = useState<{
        monthsData: {monthName: string, transactions: Transaction[]}[]
        yearsData: {year: number, transactions: Transaction[]}[]
    }>([]) */


    /*

    Last months cache

    in cache = {
        lastMonthsComparative: {timestamps: number, income: number, expense: number}[]
    }

    is like: 
        {
            "lastMonthsComparative": [
                {
                    "timestamps": 23446133, # 01/01/2023
                    "income": 123.45,
                    "expense": 14234.12,
                },
                {
                    "timestamps": 92223812, # 01/02/2023
                    "income": 2234.12,
                    "expense": 2344.12,
                },
                {{
                    "timestamps": 53443812, # 01/03/2023
                    "income": 64345.12,
                    "expense": 34534.12,
                },
                {
                    "timestamps": 64434512, # 01/03/2023
                    "income": 43224,
                    "expense": 4234.12,
                }
            ]
        }


    */

    const getTransactionsByTimeRange = async (startTimestemps: number, endTimestemps: number) => {
        try {
            const response = await api.get(`/transaction/from-user/1?start_date=${startTimestemps}&end_date=${endTimestemps}`)
            console.log(response)
            setCurrentDashboardTransactions(response.data.transactions)
        } catch (error) {
            console.log(error)
        }
    }

    // ------------------------------------------------------------------------------------------------------------------------------------------------

    const saveTransactions = async (transactions: Transaction[]) => {
        try {
            const response = await api.post('/transaction/create-many-transactions/1', transactions,
                {
                headers: { "Content-Type": "application/json" } // ✅ Explicitly set headers
                }
            )
            successToast(response)
        } catch (error) {
            errorToast(error as AxiosError)
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
            saveTransactions,
            getAllTransactions,
            categories,
            add_transaction,
            update_transaction,
            delete_transaction,
            getTransactionsByCategorizedFile,
            getTransactionsByTimeRange,
            currentDashboardTransactions,
        }}>
            {children}
        </RequisitionsManagerContext.Provider>
    )
}