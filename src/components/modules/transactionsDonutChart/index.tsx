import { Card } from "@material-tailwind/react";
import { useState } from "react";
import MenuDirection from "./MenuDirection";
import { treatedTransactionsTemplate } from "./logic";
import DonutChart from "../../charts/DonutChart";
import { Transaction } from "../../../schemas/Transaction";


export default function TransactionsDonutChart({transactions} : {transactions: Transaction[]}) {

    const treatedData = treatedTransactionsTemplate(transactions)

    const [isExpense, setIsExpense] = useState<boolean>(true)

    return (
        <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <div className="flex flex-col mb-2">
                <div className="block text-sm font-medium leading-6 text-gray-900">Estatística das Categoria</div>
                <MenuDirection isExpense={isExpense} setIsExpense={setIsExpense} />
            </div>
            {treatedData ? (
                <DonutChart
                    series={isExpense ? treatedData.expenseSeries : treatedData.incomeSeries}
                    colors={isExpense ? treatedData.expenseColors : treatedData.incomeColors}
                    labels={isExpense ? treatedData.expenseLabels : treatedData.incomeLabels}
                    formatter={treatedData.formatter}
                />
            ) : (
                <div className="h-full flex flex-col animate-pulse">
                    <div className="w-60 h-60 mx-auto my-auto bg-gray-200 rounded-full flex">
                        <div className="w-40 h-40 mx-auto my-auto bg-white rounded-full"></div>
                    </div>
                    <div className="flex gap-4 mt-6">
                        <div className="w-full h-4 mx-auto my-auto bg-gray-200 rounded-md"></div>
                        <div className="w-full h-4 mx-auto my-auto bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            )}
        </Card>
    );
}
