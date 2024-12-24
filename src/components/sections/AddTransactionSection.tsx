import { useState } from "react"
import FileUpload from "../FileUpload"
import { InputText } from "../micro/InputText"
import { StyledButton } from "../micro/StyledButton"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Transaction } from "../../schemas/Transaction"
import { isValidAmountFormat, isValidDateFormat } from "../logic/validator"


interface AddTransactionSectionProps {
    transactions: Transaction[]
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
    setAnalyzeReqSended: (data: boolean) => void
}

export default function AddTransactionSection({ transactions, setTransactions, setAnalyzeReqSended }: AddTransactionSectionProps) {

    const [showTransactionForm, setShowTransactionForm] = useState(false)

    const [incomeOrExpense, setIncomeOrExpense] = useState<"income" | "expense">("income")
    const [transactionDescription, setTransactionDescription] = useState<null | string>(null)
    const [transactionAmount , setTransactionAmount] = useState<null | string>(null)
    const [invalidAmount, setInvalidAmount] = useState<boolean>(false)
    const [transactionDate, setTransactionDate] = useState<null | string>(null)
    const [invalidDate, setInvalidDate] = useState<boolean>(false)
    const [transactionCategory, setTransactionCategory] = useState<null | string>(null)

    const addTransaction = () => {

        let editedTransactionAmount: string = ''
        if(incomeOrExpense === "expense"){ 
            editedTransactionAmount = `-${transactionAmount}`
        } else if(incomeOrExpense === "income"){
            editedTransactionAmount = `${transactionAmount}`
        }

        const transaction = {
          id: crypto.randomUUID(),
          memo: transactionDescription,
          amount: editedTransactionAmount,
          date: transactionDate,
          category: transactionCategory,
        }
    
        setTransactions([...transactions, transaction])
    }

    const validateForm = () => {

        if(!isValidDateFormat(transactionDate!)){
            setInvalidDate(true)
        } else{
            setInvalidDate(false)
        }

        if(!isValidAmountFormat(transactionAmount!)){
            setInvalidAmount(true)
        } else{
            setInvalidAmount(false)
        }

        if(
            isValidDateFormat(transactionDate!)
            && isValidAmountFormat(transactionAmount!)
        ){
            addTransaction()
        }
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
                        <InputText.Root
                            label='Descrição'
                            className='w-full'
                            onChange={(e) => setTransactionDescription(e.target.value)}
                        />
                        <InputText.Root 
                            label='Valor'
                            placeholder='0,00'
                            onChange={(e) => setTransactionAmount(e.target.value)}
                            validationError={invalidAmount}
                            invalidMessage='Utilize o formato 0,00'
                        >
                            <InputText.AddOn text='R$'/>
                        </InputText.Root>
                    </div>
                    <div className='mt-2 flex gap-4'>
                        <InputText.Root
                            label='Data'
                            placeholder='dd/mm/aaaa'
                            onChange={(e) => setTransactionDate(e.target.value)}
                            validationError={invalidDate}
                            invalidMessage='Utilize uma data válida e com o formato DD/MM/AAAA'
                        />
                        <InputText.Root
                            label='Categoria'
                            className='w-full'
                            onChange={(e) => setTransactionCategory(e.target.value)}
                        />
                        <div className='h-9 flex mt-8'>
                            <span className="isolate inline-flex rounded-md shadow-sm">
                                <button
                                    onClick={() => setIncomeOrExpense('income')}
                                    type="button"
                                    defaultChecked
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
                        <StyledButton.Root className='h-9 mt-8' action={validateForm}>Adicionar</StyledButton.Root>
                    </div>
                </div>
            </div>
        </div>
    )
}