import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";
import { AuthContext } from "./Auth";

interface RequisitionsManagerContextType { 
    instance: AxiosInstance | null
    respData: AxiosResponse | AxiosError | null
    saveTransactions: (transactions: Transaction[]) => void
}

export const RequisitionsManagerContext = createContext<RequisitionsManagerContextType>({
    instance: null,
    respData: null,
    saveTransactions: () => {}
});

export function RequisitionsManagerProvider({ children } : { children: React.ReactNode }) {

    const { instance } = useContext(AuthContext)

    const [respData, setRespData] = useState<AxiosResponse | AxiosError | null>(null)

    const saveTransactions = async (transactions: Transaction[]) => {
        try {
            const response = await instance.post('/transaction/create-many-transactions/1', transactions)
            console.log(response)
            setRespData(response)

            setTimeout(() => setRespData(null), 5000)
        } catch (error) {
            console.log(error)
            setRespData(error)

            setTimeout(() => setRespData(null), 5000)
        }
    }

    return (
        <RequisitionsManagerContext.Provider value={{
            instance,
            respData,
            saveTransactions
        }}>
            {children}
        </RequisitionsManagerContext.Provider>
    )
}