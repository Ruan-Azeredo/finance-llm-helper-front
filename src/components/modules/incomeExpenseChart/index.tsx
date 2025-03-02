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
            <TwoLinesChart
                series={treatedData.series}
                colors={["#e11d48", "#16a34a"]}
                categories={treatedData.categories}
                formatter={treatedData.formatter}
            />
            
        </Card>
    )
}