import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { createContext, useState } from "react";
import { Transaction } from "../schemas/Transaction";

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

    const [respData, setRespData] = useState<AxiosResponse | AxiosError | null>(null)
    
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            common: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJydWFuQGdtaWwuY29tIiwiZXhwIjoxNzQwNDA2MDE4fQ.VlhIdJncHlsboP1RNfzI9MoqqGEGa7IZEa2-T5uWth8`
            }
        }
    })

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