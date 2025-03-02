import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Series = {
    name: string;
    data: number[];
};

type ChartOptions = ApexOptions;

type chartConfigProps = {
    height: number;
    series: Series[];
    options: ChartOptions;
};

export default function TwoLinesChart({
    series,
    colors,
    categories,
    formatter
} : {
    series: {name: string, data: number[]}[],
    colors: string[],
    categories: string[],
    formatter: (val: number) => string
}) {

    const chartConfig : chartConfigProps = {
        height: 300,
        series: series,
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                text: "",
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 0.95,
                    opacityFrom: 0.9,
                    opacityTo: 0.9,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: colors,
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
                categories: categories
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                    formatter: formatter as (val: number, opts?: { [key: string]: unknown }) => string,
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
                    shape: 'circle' as const, // Explicitly cast to ApexMarkerShape
                    size: 5            
                }
            }
        }
    }
return (
    <Chart type="area" {...chartConfig} />
);
}