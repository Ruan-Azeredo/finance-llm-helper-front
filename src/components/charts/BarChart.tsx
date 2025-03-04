import Chart from "react-apexcharts"; // or the appropriate library

type chartConfigProps = {
  height: number;
  series: { name: string; data: number[] }[];
  options: {
    chart: { toolbar: { show: boolean } };
    title: { text: string };
    dataLabels: { enabled: boolean };
    legend: { show: boolean };
    colors: string[];
    plotOptions: { bar: { columnWidth: string; borderRadius: number, distributed: boolean } };
    xaxis: {
      axisTicks: { show: boolean };
      axisBorder: { show: boolean };
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
      categories: string[];
    };
    yaxis: {
      labels: {
        style: {
          colors: string;
          fontSize: string;
          fontFamily: string;
          fontWeight: number;
        };
      };
    };
    grid: {
      show: boolean;
      borderColor: string;
      strokeDashArray: number;
      xaxis: { lines: { show: boolean } };
      padding: { top: number; right: number };
    };
    fill: { opacity: number };
    tooltip: { theme: string; marker: { show: boolean } };
  };
};

export default function BarChart({
  series,
  colors,
  categories,
  formatter
} : {
  series: { name: string; data: number[] }[],
  colors: string[],
  categories: string[],
  formatter: (val: number) => string
}) {

  const chartConfig : chartConfigProps = {
    height: 240,
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
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return "R$" + val;
        },
        offsetY: 20,
        ///topOffset: -20,
        style: {
          fontSize: '12px',
          colors: ["#678493"]
        }
      },
      legend: {
        show: false
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "70%",
          borderRadius: 5 ,
          distributed: true,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: { 
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: categories,
      },
      yaxis: {
        show: false,
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
      fill: {
        opacity: 1,
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: false,
      },
      },
    },
  };
  return (
    <Chart type="bar" {...chartConfig} />
  );
}