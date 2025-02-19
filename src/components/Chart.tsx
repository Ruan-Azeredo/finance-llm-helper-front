import {
    Card,
    CardBody,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import Chart from "react-apexcharts";
  import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { default_categories } from "./const/default_categories";
import { categories_colors as colors } from "./const/colors";
import { useContext, useEffect, useState } from "react";
import { TransactionsTemplateContext } from "../contexts/TransactionsTemplate";
import { Transaction } from "../schemas/Transaction";
import { ApexOptions } from "apexcharts";
import { wrap } from "module";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
   
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

      width: '100%',
      height: 280,
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
          fontSize: '12px',
          fontFamily: "Geist",
          clusterGroupedSeriesOrientation: 'horizontal',
          //offsetY: 100,
          itemMargin: {
            horizontal: 10,
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

        <div className="flex flex-col mb-2">
          <div className="block text-sm font-medium leading-6 text-gray-900 ">Estatística  das Categoria</div>
        
          <Menu as="div" className="relative w-fit inline-block text-left group">
            <div>
              <MenuButton className="inline-flex justify-center rounded-md bg-white text-sm font-semibold text-gray-400 shadow-xs group-hover:text-gray-600">
                {sei ? "Despesas" : "Receitas"}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400 group-hover:text-gray-600" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={() => setSei(true)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden  hover:bg-gray-100 hover:text-gray-900 w-full"
                  >
                    Despesas
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setSei(false)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden  hover:bg-gray-100 hover:text-gray-900 w-full"
                  >
                    Receitas
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
            <Chart type="donut" {...chartConfig} />
          
      </Card>
    );
  }