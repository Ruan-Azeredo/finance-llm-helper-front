import { useState } from "react"
import { InputText } from "../micro/InputText"
import { StyledButton } from "../micro/StyledButton"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import { isValidAmountFormat, isValidDateFormat } from "../logic/validator"
import { Transaction } from "../../schemas/Transaction"
import { add_transaction, update_transaction } from "../logic/transactions_ops"
import Form from "./Form"

const TransactionForm = ({
    type = "add",
    transaction,
    transactions,
    setTransactions,
    setOpen
} : {
    type?: "add" | "update",
    transaction?: Transaction
    transactions: Transaction[],
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
    setOpen?: React.Dispatch<React.SetStateAction<Transaction[]>>
}) => {

    const [incomeOrExpense, setIncomeOrExpense] = useState<"income" | "expense" | null>(transaction?.direction ?? "income")
    const [transactionDescription, setTransactionDescription] = useState<null | string>(null)
    const [transactionAmount , setTransactionAmount] = useState<null | string>(null)
    const [invalidAmount, setInvalidAmount] = useState<boolean>(false)
    const [transactionDate, setTransactionDate] = useState<null | string>(null)
    const [invalidDate, setInvalidDate] = useState<boolean>(false)
    const [transactionCategory, setTransactionCategory] = useState<null | string>(null)

    
    const new_transaction: Transaction = {
        id:  transaction?.id ?? crypto.randomUUID(),
        memo: transactionDescription ?? transaction?.memo ?? null,
        amount: transactionAmount ?? transaction?.amount ?? null,
        date: transactionDate ?? transaction?.date ?? null,
        category: transactionCategory ?? transaction?.category ?? null,
        direction: incomeOrExpense ?? transaction?.direction ?? null
    }

    const addTransaction = (new_transaction: Transaction): void => {
        
        add_transaction(setTransactions, transactions, new_transaction)
    }

    const updateTransaction = (new_transaction: Transaction, incomeOrExpense: "income" | "expense"): void => {

        if(incomeOrExpense === transaction?.direction){
            setIncomeOrExpense(null)
        }
        
        update_transaction(setTransactions, transactions, new_transaction)
    }

    const validateAddForm = (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string
    ): boolean => {

        let allValid = true
        console.log(transactionDate, transactionAmount)
        
        if(!isValidDateFormat(transactionDate!)){
            setInvalidDate(true)
            allValid = false
        } else{
            setInvalidDate(false)
        }
        
        if(!isValidAmountFormat(transactionAmount!)){
            setInvalidAmount(true)
            allValid = false
        } else{
            setInvalidAmount(false)
        }

        if(isValidDateFormat(transactionDate!) && isValidAmountFormat(transactionAmount!) && allValid){
            return true
        }
        
        return false
    }

    const validateUpdateForm = (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string
    ): boolean => {
        
        let allValid = true
        
        if(transactionDate !== null){
            if(!isValidDateFormat(transactionDate!)){
                setInvalidDate(true)
                allValid = false
            }
            setInvalidDate(false)
        } else{
            setInvalidDate(false)
        }
        
        if(transactionAmount !== null){
            if(!isValidAmountFormat(transactionAmount!)){
                setInvalidAmount(true)
                allValid = false
            }
            setInvalidAmount(false)
        } else{
            setInvalidAmount(false)
        }
        
        if(
            allValid
        ){
            return true
        }

        return false
    }
    
/*     const submitForm = (validator: () => boolean, action: () => void): void => {
        if (validator() === true) {
            
            console.log('valid')
            action()
        }
    } */

    let btn
    if(type === 'update'){
        btn = <StyledButton.Root submit className='h-9 mt-8 flex' 
        action={() => {
            if (validateUpdateForm(
                    isValidDateFormat, isValidAmountFormat,
                    setInvalidDate, setInvalidAmount,
                    transactionDate, transactionAmount
            ) === true) {
            
                console.log('valid')
                updateTransaction(new_transaction, incomeOrExpense!)
            }
    }}
        >Atualizar</StyledButton.Root>
    } else{
        btn = <StyledButton.Root submit className='h-9 mt-8 flex' 
        action={() => {
            if (validateAddForm(
                    isValidDateFormat, isValidAmountFormat,
                    setInvalidDate, setInvalidAmount,
                    transactionDate, transactionAmount
            ) === true) {
            
                console.log('valid')
                addTransaction(new_transaction)
            }
    }}
            
        >Adicionar</StyledButton.Root>
    }

    return (
        <div>
            <Form/>
        </div>
    )
}

export default TransactionForm