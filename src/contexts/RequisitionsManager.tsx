import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { AuthContext } from "./Auth";

interface RequisitionsManagerContextType { 
    instance: AxiosInstance | null
    respData: AxiosResponse | AxiosError | null
    saveTransactions: (transactions: Transaction[]) => void
    getAllTransactions: () => void
}

export const RequisitionsManagerContext = createContext<RequisitionsManagerContextType>({
    instance: null,
    respData: null,
    saveTransactions: () => {},
    getAllTransactions: () => {}
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
            setRespData(error)

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

    return (
        <RequisitionsManagerContext.Provider value={{
            instance,
            respData,
            saveTransactions,
            getAllTransactions
        }}>
            {children}
        </RequisitionsManagerContext.Provider>
    )
}