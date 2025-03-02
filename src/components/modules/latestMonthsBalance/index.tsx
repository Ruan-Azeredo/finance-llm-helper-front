import { Card } from "@material-tailwind/react";
import { treatedlastMonthsData } from "./logic";
import BarChart from "../../charts/BarChart";

export default function latestMonthsBalance({monthsBalance, months} : {monthsBalance: number[], months: string[]}){

    const treatedData = treatedlastMonthsData(monthsBalance, months)

    return (
        <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <div className="flex flex-col mb-2">
                <div className="block text-sm font-medium leading-6 text-gray-900 ">Saldo dos ultimos Meses</div>
            
            </div>
            <BarChart
                series={treatedData.series}
                colors={treatedData.colors}
                categories={treatedData.categories}
            />
            
        </Card>
    )
}