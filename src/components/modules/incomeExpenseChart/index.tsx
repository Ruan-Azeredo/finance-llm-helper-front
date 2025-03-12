import { Card } from "@material-tailwind/react";
import { Transaction } from "../../../schemas/Transaction";
import TwoLinesChart from "../../charts/TwoLinesChart";
import { treatedTransactionsData } from "./logic";

export default function IncomeExpenseChart({transactions} : {transactions: Transaction[]}){

    const treatedData = treatedTransactionsData(transactions)

    return (
        <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <div className="flex flex-col mb-2">
                <div className="block text-sm font-medium leading-6 text-gray-900 ">Receitas x Despesas</div>
            
            </div>
            {treatedData ? (
                <TwoLinesChart
                    series={treatedData.series}
                    colors={treatedData.colors}
                    categories={treatedData.categories}
                    formatter={treatedData.formatter}
                />
            ) : (
                <div className="w-full flex flex-col animate-pulse">
                    <div className="h-64 bg-gray-200 rounded  chart-skeleton"></div>
                    <div className="flex gap-4 mt-7">
                        <div className="w-full h-4 mx-auto my-auto bg-gray-200 rounded-md"></div>
                        <div className="w-full h-4 mx-auto my-auto bg-gray-200 rounded-md"></div>
                    </div>
                    
                    <style>
                        {`
                            .chart-skeleton {
                                clip-path: polygon(28% 51%, 70% 45%, 100% 27%, 100% 100%, 0 100%, 0 76%);
                            }
                        `}
                    </style>
                </div>
            )}
            
        </Card>
    )
}