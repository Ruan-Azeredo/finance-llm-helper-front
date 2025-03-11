import Chart from "react-apexcharts";

interface chartConfigProps {
    width: string;
    height: number;
    dataLabels: {
      enabled: boolean;
    };
    series: number[];
    options: {
      chart: {
        toolbar: {
          show: boolean;
        };
      };
      title: {
        text: string;
        align: "left";
      };
      dataLabels: {
        enabled: boolean;
      };
      colors: string[];
      legend: {
        show: boolean;
        position: "bottom";
        fontSize: string;
        fontFamily: string;
        clusterGroupedSeriesOrientation: "horizontal";
        itemMargin: {
          horizontal: number;
          vertical: number;
        };
        formatter?: (val: string) => string;
        markers: {
          size: number;
        }
      };
      labels: string[];
      tooltip?: {
        theme: string;
        marker: {
          show: boolean;
        };
      };
    };
  }

const DonutChart = ({series, colors, labels} : {series: number[], colors: string[], labels: string[]}) => {

    const chartConfig: chartConfigProps = {

        width: '100%',
        height: 280,
        dataLabels: {
          enabled: true,
        },
        series: series,
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          title: {
            text: '',
            align: 'left' as const,
          },
          dataLabels: {
            enabled: false,
          },
          colors: colors,
          legend: {
            show: true,
            position: 'bottom' as const,
            fontSize: '12px',
            fontFamily: "Geist",
            clusterGroupedSeriesOrientation: 'horizontal',
            itemMargin: {
              horizontal: 10,
              vertical: 5,
              
            },
            markers: {
              size: 5,
            },
          },
          tooltip: {
            theme: 'custom-dark',
            marker: {
              show: false,
            },
          },
          labels: labels,
        },
      };

    return (
      <>
        <Chart type="donut" {...chartConfig} />
        <style>
          {`
            .apexcharts-theme-custom-dark {
              background: rgba(30, 30, 30, .8); !important;
            }
            .apexcharts-theme-custom-dark .apexcharts-tooltip-series-group {
              color: white !important;
            }

          `}
        </style>
      </>
    )
}

export default DonutChart