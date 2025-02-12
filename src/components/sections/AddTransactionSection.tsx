import { useState } from "react"
import FileUpload from "../FileUpload"
import { StyledButton } from "../micro/StyledButton"
import { Transaction } from "../../schemas/Transaction"
import TransactionForm from "../form/TransactionForm"


interface AddTransactionSectionProps {
    transactions: Transaction[]
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
    setAnalyzeReqSended: (data: boolean) => void
}

export default function AddTransactionSection({ transactions, setTransactions, setAnalyzeReqSended }: AddTransactionSectionProps) {

    const [showTransactionForm, setShowTransactionForm] = useState(false)

    

    return (
        <div className="p-6">
            <div className='flex flex-col '>
                <div className='mb-4'>
                    <div className='text-base/7 font-semibold text-gray-900'>Adicione suas Transações aqui</div>
                    <div className="mt-1 text-sm/6 text-gray-600">Voce pode adicionar suas transações atravez do upload de um arquivo e a nossa IA irá analisar e classificar suas transações, ou adicionar manualmente.</div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <StyledButton.Root type='secondary' action={() => setShowTransactionForm(!showTransactionForm)}>
                            Adicionar transação
                        </StyledButton.Root>
                    
                    </div>
                    <FileUpload setAnalyzeReqSended={setAnalyzeReqSended} setTransactions={setTransactions}/>
                </div>
                
                <div className={showTransactionForm ? 'mt-6' : 'hidden'} >
                    <TransactionForm transactions={transactions} setTransactions={setTransactions}/>
                </div>
            </div>
        </div>
    )
}