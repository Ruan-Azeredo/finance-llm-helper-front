import { useState } from "react"
import FileUpload from "../FileUpload"
import { InputText } from "../micro/InputText"
import { StyledButton } from "../micro/StyledButton"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Transaction } from "../../schemas/Transaction"


interface AddTransactionSectionProps {
    transactions: Transaction[]
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
    setAnalyzeReqSended: (data: boolean) => void
}

export default function AddTransactionSection({ transactions, setTransactions, setAnalyzeReqSended }: AddTransactionSectionProps) {

    const [showTransactionForm, setShowTransactionForm] = useState(false)

    const [incomeOrExpense, setIncomeOrExpense] = useState<null | "income" | "expense">(null)
    const [transactionDescription, setTransactionDescription] = useState<null | string>(null)
    const [transactionValue, setTransactionValue] = useState<null | string>(null)
    const [transactionDate, setTransactionDate] = useState<null | string>(null)
    const [transactionCategory, setTransactionCategory] = useState<null | string>(null)

    const addTransaction = () => {

        if(incomeOrExpense === "expense"){
            setTransactionValue(`-${transactionValue}`)
        } else if(incomeOrExpense === "income"){
            setTransactionValue(`${transactionValue}`)
        }

        const transaction = {
          id: crypto.randomUUID(),
          memo: transactionDescription,
          amount: transactionValue,
          date: transactionDate,
          category: transactionCategory,
        }
    
        setTransactions([...transactions, transaction])
    } 

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
                
                <div className={showTransactionForm ? '' : 'hidden'} >
                    <div className={`mt-6 flex gap-4`}>
                        <InputText.Root label='Descrição' className='w-full' onChange={(e) => setTransactionDescription(e.target.value)}/>
                        <InputText.Root label='Valor' placeholder='0,00' onChange={(e) => setTransactionValue(e.target.value)}>
                            <InputText.AddOn text='R$'/>
                        </InputText.Root>
                    </div>
                    <div className='mt-2 flex gap-4'>
                        <InputText.Root label='Data' placeholder='dd/mm/aaaa' onChange={(e) => setTransactionDate(e.target.value)}/>
                        <InputText.Root label='Categoria' className='w-full' onChange={(e) => setTransactionCategory(e.target.value)}/>
                        <div className='h-9 flex mt-auto'>
                            <span className="isolate inline-flex rounded-md shadow-sm">
                                <button
                                    onClick={() => setIncomeOrExpense('income')}
                                    type="button"
                                    className={`relative -ml-px inline-flex items-center rounded-l-md ${incomeOrExpense === 'income' ? 'bg-green-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'} px-3 text-sm font-semibold  ring-1 ring-inset ring-gray-300 focus:z-10`}
                                >
                                    <span><PlusIcon className={`h-5 w-5 mr-1 ${incomeOrExpense === 'income' ? 'text-white' : 'text-green-500'}`}/></span>Entrada
                                </button>
                                <button
                                    onClick={() => setIncomeOrExpense('expense')}
                                    type="button"
                                    className={`relative -ml-px inline-flex items-center rounded-r-md ${incomeOrExpense === 'expense' ? 'bg-red-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'} px-3 text-sm font-semibold  ring-1 ring-inset ring-gray-300 focus:z-10`}
                                >
                                    <span><MinusIcon className={`h-5 w-5 mr-1 ${incomeOrExpense === 'expense' ? 'text-white' : 'text-red-500'}`}/></span>Saída
                                </button>
                            </span>
                        </div>
                        <StyledButton.Root className='h-9 mt-auto' action={addTransaction}>Salvar</StyledButton.Root>
                    </div>
                </div>
            </div>
        </div>
    )
}