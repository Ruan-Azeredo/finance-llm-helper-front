import { categories_colors } from "../../const/colors";

export const treatedlastMonthsData = (monthsBalance: number[], months: string[]) : { 
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string[];
    formatter: (val: number) => string;
    position: "top" | "bottom";
} => {

    return {
        series: [
            {
                name: "Saldo",
                data: monthsBalance
            },
        ],
        categories: months,
        colors: monthsBalance.map((value) => (value > 0 ? categories_colors[2] : "#ff5252")), // Definindo as cores
        formatter: function (val) {
            if(val < 0){
                if(Math.abs(val) > 1000000000){
                    return "-" + (Math.abs(val) / 1000000000).toFixed(1).toString().replace('.', ',') + "B"
                } else if(Math.abs(val) > 1000000){
                    return "-" + (Math.abs(val) / 1000000).toFixed(1).toString().replace('.', ',') + "M"
                } else if(Math.abs(val) > 1000){
                    return "-" + (Math.abs(val) / 1000).toFixed(1).toString().replace('.', ',') + "K"
                }
              return "-" + Math.abs(val).toFixed(0).toString().replace('.', ',')
            } else {
                if(val > 1000000000){
                    return (val / 1000000000).toFixed(1).toString().replace('.', ',') + "B"
                } else if(val > 1000000){
                    return (val / 1000000).toFixed(1).toString().replace('.', ',') + "M"
                } else if(val > 1000){
                    return (val / 1000).toFixed(1).toString().replace('.', ',') + "K"
                }
              return "" + val.toFixed(0).toString().replace('.', ',')
            }
        },
        position: monthsBalance.every(value => value > 0) ? "top" : "bottom"
    }
}