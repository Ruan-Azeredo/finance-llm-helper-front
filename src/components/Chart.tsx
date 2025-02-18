import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { colors, default_categories } from "../default_categories";
import { useContext, useEffect, useState } from "react";
import { TransactionsTemplateContext } from "../contexts/TransactionsTemplate";
import { Transaction } from "../schemas/Transaction";
import { ApexOptions } from "apexcharts";
import { wrap } from "module";
   
  // If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
  // import dynamic from "next/dynamic";
  // const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

  
  
  export default function Example() {

    const { transactionsTemplate } = useContext(TransactionsTemplateContext)
    
    const respectiveColorToCategory = (defaultCategories: {name: string, color: number}[], colors: string[]) => {

      // {category: 'Alimentação', color: '#ff0000'}
      return defaultCategories.map((category) => ({ category: category.name, color: colors[category.color] }));
    }

    function somarPorCategoria(transacoes: Transaction[]): { category: string; total: number; colors: string }[] {
      const resultado: Record<string, number> = {};
      
      transacoes.forEach(item => {
        let valor = parseFloat(item.amount!.replace(",", "."));
        if (!resultado[item.category!]) {
          resultado[item.category!] = 0;
        }
        if (item.direction === "expense") {
          valor = -valor;
        }
        resultado[item.category!] += valor;
      });
      
      // { category: 'Alimentação', total: 105.50, colors: '#ff0000' }
      const categoryColors = respectiveColorToCategory(default_categories, colors);
      return Object.keys(resultado).map(category => {
        const categoryColor = categoryColors.find((cat: { category: string; }) => cat.category === category)?.color || '#000000';
        return { category, total: parseFloat(resultado[category].toFixed(2)), colors: categoryColor };
      });
    }


    console.log('mi mi: ',somarPorCategoria(transactionsTemplate))

    const [accordingDirection, setAccordingDirection] = useState<{ category: string; total: number; colors: string }[]>([]);
    const [expenseOrIncome, setExpenseOrIncome] = useState<"expense" | "income">("expense");

    const defineAccordingDirection = (transactionsTemplate: Transaction[]) => {

      const changedArray = somarPorCategoria(transactionsTemplate).map((item) => ({
        ...item,
        total: item.total < 0 ? item.total * -1 : item.total
      }))

      return changedArray
      /* return [{ category: 'Alimentação', total: 105.50, colors: '#ff0000' }] */
      
    }

    const incomeTransactionsTemplate = transactionsTemplate.filter((transaction) => transaction.direction === "income");
    const expenseTransactionsTemplate = transactionsTemplate.filter((transaction) => transaction.direction === "expense");

    useEffect(() => {
      setAccordingDirection(somarPorCategoria(transactionsTemplate));
    }, [transactionsTemplate]);

    const [sei, setSei] = useState(true)
    
    const chartConfig = {

      with: 400,
      height: 340,
      dataLabels: {
        enabled: true,
      },
      series: sei ? defineAccordingDirection(expenseTransactionsTemplate).map((item) => item.total) : defineAccordingDirection(incomeTransactionsTemplate).map((item) => item.total),
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        colors: sei ? defineAccordingDirection(expenseTransactionsTemplate).map((item) => item.colors) : defineAccordingDirection(incomeTransactionsTemplate).map((item) => item.colors),
        legend: {
          show: true,
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          clusterGroupedSeriesOrientation: 'horizontal',
          //offsetY: 100,
          itemMargin: {
            horizontal: 12,
            vertical: 5,
            
          },

          // if length of labels is greater than 10, show only first 10
            formatter: function (val: string[], opts: any) {
            if (val.length > 160) {
              return val.slice(0, 14) + "...";
            }
            return val;
            }
        },
        labels: sei ? defineAccordingDirection(expenseTransactionsTemplate).map((item) => item.category) : defineAccordingDirection(incomeTransactionsTemplate).map((item) => item.category)
      },
    };

    console.log('chartConfig: ', chartConfig.labels)


    return (
      <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        
          <div className="flex flex-col items-center justify-center gap-4">
            <Chart type="donut" {...chartConfig} />
            <span className="">
              <button
                onClick={() => setSei(false)}
                type="button"
                defaultChecked
                className={`relative -ml-px inline-flex items-center rounded-l-md py-2 px-4 ${!sei ? 'bg-slate-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'} text-sm font-semibold  ring-1 ring-inset ring-gray-300 focus:z-10`}
              >
                <span></span>Entrada
              </button>
              <button
                onClick={() => setSei(true)}
                type="button"
                className={`relative -ml-px inline-flex items-center rounded-r-md py-2 px-4 ${sei ? 'bg-slate-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'} text-sm font-semibold  ring-1 ring-inset ring-gray-300 focus:z-10`}
              >
                <span></span>Saída
              </button>
            </span>
          </div>
          
      </Card>
    );
  }