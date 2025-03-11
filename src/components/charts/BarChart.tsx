import Chart from "react-apexcharts"; // or the appropriate library

type chartConfigProps = {
  height: number;
  series: { name: string; data: number[] }[];
  options: {
    chart: { toolbar: { show: boolean } };
    title: { text: string };
    dataLabels: { enabled: boolean };
    colors: string[];
    plotOptions: { bar: { columnWidth: string; borderRadius: number } };
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
  categories
} : {
  series: { name: string; data: number[] }[],
  colors: string[] | (({ value }: { value: number }) => string),
  categories: string[]
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
        enabled: false,
      },
      colors: ['#000'],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 5 ,
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
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
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