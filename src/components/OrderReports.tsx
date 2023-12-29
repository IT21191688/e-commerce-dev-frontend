/*
import React, { useState, useEffect, useRef } from "react";
import DashBoardSidBar from "./DashBoardSideBar";
import Chart from "chart.js/auto";

const OrderReports: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    // Simulated sample data
    const sampleData = [
      {
        orderDate: "2023-12-01",
        paymentid: { transactionDetails: { amount: 200 } },
      },
      {
        orderDate: "2023-12-02",
        paymentid: { transactionDetails: { amount: 150 } },
      },
      // Add more sample data here as needed
    ];

    setOrders(sampleData);
    generateChart(sampleData);
  }, []);

  const generateChartData = (data: any[]) => {
    const dailyData: any = {};
    data.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const year = orderDate.getFullYear();
      const month = orderDate.getMonth() + 1;
      const day = orderDate.getDate();

      const dailyKey = `${year}-${month}-${day}`;
      if (!dailyData[dailyKey]) {
        dailyData[dailyKey] = [];
      }
      dailyData[dailyKey].push(order.paymentid.transactionDetails.amount);
    });

    return dailyData;
  };

  const generateChart = (data: any[]) => {
    const dailyData = generateChartData(data);

    const ctx = chartRef.current;
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: Object.keys(dailyData),
      datasets: [
        {
          label: "Daily Order Amount",
          data: Object.values(dailyData).map((amounts: any) =>
            amounts.reduce((acc: any, curr: any) => acc + curr, 0)
          ),
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.4,
        },
      ],
    };

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="flex h-screen">
      <DashBoardSidBar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4">Order Reports</h1>
        <canvas
          ref={chartRef}
          id="orderChart"
          width={400}
          height={400}
        ></canvas>
      </div>
    </div>
  );
};

export default OrderReports;

*/
