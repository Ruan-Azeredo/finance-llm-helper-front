import {
Card,
CardBody,
CardHeader,
tooltip,
Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { fake_transactions } from "../const/fake_transactions";
import { legend, mark, marker, s } from "motion/react-client";
import { StopIcon } from "@heroicons/react/20/solid";

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const calculate_total = (direction : "expense" | "income") => {
    let total = 0
    const sum = fake_transactions.map((transaction) => {
        if(transaction.direction === direction){
            total += parseFloat(transaction.amount!.replace(',', '.'))
        }
        return total
    })
    console.log(sum)
    return sum.map((item) => item?.toFixed(2))
}

const chartConfig = {
type: "area",
height: 280,
series: [
    {
    name: "Despesas",
    data: /* [50, 40, 300, 320, 500, 350, 200, 230, 500], */
        //fake_transactions.map(item => item.direction === "expense" ? item.amount : 0)
        // sum every item
        calculate_total("expense")
    },
    {

    name: "Receitas",
    data: /* [30, 90, 40, 140, 290, 290, 340, 230, 400], */
    /* fake_transactions.map(item =>item.direction === "income" ? item.amount : 0) */
    calculate_total("income")
    },
],
    options: {
        chart: {
            toolbar: {
                show: false,
            },
        },
        title: {
            show: "",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.9,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ["#e11d48", "#16a34a"],
        stroke: {
            //lineCap: "round",
            curve: "smooth",
        },
        markers: {
        size: 0,
        },
    /*     legend: {
            show: false,
        }, */
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                show: false,
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            tooltip: {
                enabled: false,
            },

            categories: /* [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ] */
            fake_transactions.map(item => item.date),  

        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
                formatter: function (val, opts) {
                    return 'R$ ' + val.toFixed(2).toString().replace('.', ',')
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 0,
            xaxis: {
                lines: {
                show: false,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        tooltip: {
            theme: "dark",
            marker: {
                show: false,
            },
        },
        legend: {
            markers: {
              /* customHTML: function() {
                return `<span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px;"><svg width="440" height="440">
  <path d="M100,100 h200 a20,20 0 0 1 20,20 v200 a20,20 0 0 1 -20,20 h-200 a20,20 0 0 1 -20,-20 v-200 a20,20 0 0 1 20,-20 z" fill="none" stroke="black" stroke-width="3" />
</svg></span>`;
              } */
             shape: 'circle',
             size: 5            
            }
        }
    }
}


export default function TwoLinesChart() {
return (
    <Card>
        <CardBody className="px-0 pb-0">
            <Chart {...chartConfig} />
        </CardBody>
    </Card>
);
}