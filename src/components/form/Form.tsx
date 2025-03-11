import { useState } from "react"
import { InputText } from "../micro/InputText"
import { StyledButton } from "../micro/StyledButton"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { isValidAmountFormat, isValidCategoryFormat, isValidDateFormat } from "../logic/validator"
import { Transaction } from "../../schemas/Transaction"
import SelectCategory from "../SelectCategory"
import { default_categories } from "../const/default_categories"
import { categories_colors as colors } from "../const/colors"
import AddTransactionButton from "../AddTransactionButton"

const Form = ({
    type = "add",
    setOpen,
    transaction,
    validateAddForm,
    validateUpdateForm,
    addTransaction,
    updateTransaction,
} : {
    type?: "add" | "update",
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    transaction?: Transaction,
    validateAddForm: (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean, isValidCategoryFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>, setInvalidCategory: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string, transactionCategory: null | string
    ) => boolean,
    validateUpdateForm: (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean, isValidCategoryFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>, setInvalidCategory: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string, transactionCategory: null | string
    ) => boolean,
    addTransaction: (transaction: Transaction) => void,
    updateTransaction: (new_transaction: Transaction, incomeOrExpense: "income" | "expense", setIncomeOrExpense: React.Dispatch<React.SetStateAction<"income" | "expense" | null>>) => void
}) => {

    const [incomeOrExpense, setIncomeOrExpense] = useState<"income" | "expense" | null>(transaction?.direction ?? "income")
    const [transactionDescription, setTransactionDescription] = useState<null | string>(null)
    const [transactionAmount , setTransactionAmount] = useState<null | string>(null)
    const [invalidAmount, setInvalidAmount] = useState<boolean>(false)
    const [transactionDate, setTransactionDate] = useState<null | string>(null)
    const [invalidDate, setInvalidDate] = useState<boolean>(false)
    const [invalidCategory, setInvalidCategory] = useState<boolean>(false)
    const [transactionCategory, setTransactionCategory] = useState<null | string>(null)

    
    const new_transaction: Transaction = {
        id:  transaction?.id ?? crypto.randomUUID(),
        memo: transactionDescription ?? transaction?.memo ?? null,
        amount: transactionAmount ?? transaction?.amount ?? null,
        date: transactionDate ?? transaction?.date ?? null,
        category: transactionCategory ?? transaction?.category ?? null,
        direction: incomeOrExpense ?? transaction?.direction ?? null
    }

    let btn
    if(type === 'update'){
        btn = <StyledButton.Root className='h-9 mt-8 flex' 
            action={() => {
                if (validateUpdateForm(
                        isValidDateFormat, isValidAmountFormat, isValidCategoryFormat,
                        setInvalidDate, setInvalidAmount, setInvalidCategory,
                        transactionDate, transactionAmount, transactionCategory
                ) === true) {
                
                    console.log('valid')
                    updateTransaction(new_transaction, incomeOrExpense!, setIncomeOrExpense)
                } else{
                    console.log('invalid update', transactionDate, transactionAmount, transactionCategory)
                }
            }}
            >Atualizar</StyledButton.Root>
    } else{
        btn = <AddTransactionButton
            action={() => {
                if (validateAddForm(
                        isValidDateFormat, isValidAmountFormat, isValidCategoryFormat,
                        setInvalidDate, setInvalidAmount, setInvalidCategory,
                        transactionDate, transactionAmount, transactionCategory
                ) === true) {
                
                    console.log('valid')
                    addTransaction(new_transaction)

                } else{
                    console.log('invalid add', transactionDate, transactionAmount, transactionCategory)
                }
            }}
        />
    }

    return (
        <div>
            <div className={`flex gap-4`}>
                <InputText.Root
                    label='Descrição'
                    className='w-full'
                    defaultValue={transaction?.memo ?? undefined}
                    onChange={(e) => setTransactionDescription(e.target.value)}
                />
                <InputText.Root 
                    label='Valor'
                    placeholder='0,00'
                    defaultValue={transaction?.amount ?? undefined}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                    validationError={invalidAmount}
                    invalidMessage='Utilize o formato 0,00'
                >
                    <InputText.AddOn text='R$'/>
                </InputText.Root>
            </div>
            <div className='mt-4'>
                <div className='flex gap-4'>
                    <InputText.Root
                        label='Data'
                        placeholder='dd/mm/aaaa'
                        defaultValue={transaction?.date ?? undefined}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        validationError={invalidDate}
                        invalidMessage='Utilize uma data válida e com o formato DD/MM/AAAA'
                    />
                    <div className=''>
                        <label htmlFor='Categoria' className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Categoria
                        </label>
                        <SelectCategory 
                            setCategory={setTransactionCategory}
                            transaction={transaction}
                            categories={default_categories}
                            colors={colors}
                            validationError={invalidCategory}
                            invalidMessage='Defina uma categoria'
                        />  
                    </div>
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

                    <div className={`hidden ${type === 'add' ? 'xl:flex' : null}`}>
                        {btn}
                    </div>
                </div>
                <div className={`flex ${type === 'add' ? 'xl:hidden' : 'justify-end'}`}>
                    <StyledButton.Root type="secondary" className={`mr-4 h-9 mt-8 flex ${type === 'add' ? 'hidden' : 'justify-end'}`} action={() => setOpen && setOpen(false)}>Cancelar</StyledButton.Root>
                    {btn}
                </div>
            </div>
        </div>
    )
}

export default Form