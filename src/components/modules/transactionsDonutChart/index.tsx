import { Card } from "@material-tailwind/react";
import { useContext, useState } from "react";
import MenuDirection from "./MenuDirection";
import { treatedTransactionsTemplate } from "./logic";
import { TransactionsTemplateContext } from "../../../contexts/TransactionsTemplate";
import DonutChart from "../../charts/DonutChart";

  
export default function TransactionsDonutChart() {

    const { transactionsTemplate } = useContext(TransactionsTemplateContext)

    const treatedData = treatedTransactionsTemplate(transactionsTemplate)

    const [isExpense, setIsExpense] = useState<boolean>(true)

    return (
        <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <div className="flex flex-col mb-2">
                <div className="block text-sm font-medium leading-6 text-gray-900 ">Estatística  das Categoria</div>
                <MenuDirection isExpense={isExpense} setIsExpense={setIsExpense}/>
            
            </div>
            <DonutChart
                series={isExpense ? treatedData.expenseSeries : treatedData.incomeSeries}
                colors={isExpense ? treatedData.expenseColors : treatedData.incomeColors}
                labels={isExpense ? treatedData.expenseLabels : treatedData.incomeLabels}
            />
            
        </Card>
    );
}