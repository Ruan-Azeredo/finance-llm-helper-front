import { StyledButton } from "../micro/StyledButton"
import TransactionsTable from "../modules/transactionsTable"
import { useContext, useEffect, useState } from "react"
import { TransactionsTemplateContext } from "../../contexts/TransactionsTemplate"
import { calculate_total } from "../logic/transactions_operations"
import { RequisitionsManagerContext } from "../../contexts/RequisitionsManager"

export default function TransactionsSection() {

    const { transactionsTemplate } = useContext(TransactionsTemplateContext)
    const { saveTransactions } = useContext(RequisitionsManagerContext)

    const [totalAmount, setTotalAmount] = useState('R$ 0,00')

    useEffect(() => {
        
        setTotalAmount(calculate_total(transactionsTemplate))
        
    }, [transactionsTemplate])

    return (
        <div className="p-6 flex flex-col">
            <div className='flex justify-between'>
            <div className=' text-lg/7 font-semibold text-gray-900'>Transações</div>
            {/* <StyledButton.Root className='ml-auto mr-4' type='secondary' action={() => console.log(transactions)}>Transactions</StyledButton.Root> */}
            <StyledButton.Root className='ml-auto mr-4' type='secondary'>Saldo Total: <span className={totalAmount[0] === '-' ? 'text-red-500' : 'text-green-500'}>{totalAmount}</span>
            </StyledButton.Root>
            <StyledButton.Root type='dark' action={() => saveTransactions(transactionsTemplate)}>Salvar</StyledButton.Root>
            </div>
            <TransactionsTable transactions={transactionsTemplate} isTemplate={true}/>
        </div>                                                                                                             
    )
}