import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashBoardSideBar from "./DashBoardSideBar";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderReports: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [dailyReport, setDailyReport] = useState<number[]>([]);
  const [monthlyReport, setMonthlyReport] = useState<number[]>([]);
  const [yearlyReport, setYearlyReport] = useState<number[]>([]);
  const [selectedReport, setSelectedReport] = useState<string>("daily");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    generateReports();
  }, [orders, selectedYear, selectedMonth]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing in localStorage");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        "http://localhost:8090/api/v1/order/getAllOrders",
        { headers }
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const generateReports = () => {
    const dailySales: number[] = new Array(31).fill(0);
    const monthlySales: number[] = new Array(12).fill(0);
    const yearlySales: number[] = new Array(
      new Date().getFullYear() - 2010
    ).fill(0);

    orders.forEach((order: any) => {
      const orderDate = new Date(order.orderdate);
      const day = orderDate.getDate();
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear() - 2011;

      const orderAmount = order.paymentid.transactionDetails.amount;

      if (year === selectedYear - 2011 && month === selectedMonth - 1) {
        dailySales[day - 1] += orderAmount;
      }

      if (year === selectedYear - 2011) {
        monthlySales[month] += orderAmount;
      }

      yearlySales[year] += orderAmount;
    });

    setDailyReport(dailySales);
    setMonthlyReport(monthlySales);
    setYearlyReport(yearlySales);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleReportChange = (reportType: string) => {
    setSelectedReport(reportType);
  };

  const renderReport = () => {
    let data: any = {};
    let label = "";
    let chartData: any = {};

    if (selectedReport === "daily") {
      data = dailyReport;
      label = "Daily Sales Report";

      chartData = {
        labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
        datasets: [
          {
            label,
            data,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };
    } else if (selectedReport === "monthly") {
      data = monthlyReport;
      label = "Monthly Sales Report";

      chartData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label,
            data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    } else {
      data = yearlyReport;
      label = "Yearly Sales Report";

      chartData = {
        labels: Array.from(
          { length: new Date().getFullYear() - 2010 },
          (_, i) => (2011 + i).toString()
        ),
        datasets: [
          {
            label,
            data,
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    }

    return (
      <div className="mt-20" style={{ width: "800px", margin: "20px auto" }}>
        <b>
          <h2 className="text-center text-3xl pb-5">{label}</h2>
        </b>
        {selectedReport === "daily" && (
          <div className="flex justify-center items-center">
            <select
              className="mx-2 px-2 py-1 rounded border"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Array.from(
                { length: new Date().getFullYear() - 2010 },
                (_, i) => (
                  <option key={i} value={2011 + i}>
                    {2011 + i}
                  </option>
                )
              )}
            </select>
            <select
              className="mx-2 px-2 py-1 rounded border"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        )}
        <Bar data={chartData} />
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <DashBoardSideBar />
      <div className="flex-grow p-8">
        <div className="flex justify-between mb-4">
          <button
            className={`${
              selectedReport === "daily" ? "bg-blue-500" : "bg-gray-300"
            } text-white py-2 px-4 rounded`}
            onClick={() => handleReportChange("daily")}
          >
            Daily Report
          </button>
          <button
            className={`${
              selectedReport === "monthly" ? "bg-blue-500" : "bg-gray-300"
            } text-white py-2 px-4 rounded`}
            onClick={() => handleReportChange("monthly")}
          >
            Monthly Report
          </button>
          <button
            className={`${
              selectedReport === "yearly" ? "bg-blue-500" : "bg-gray-300"
            } text-white py-2 px-4 rounded`}
            onClick={() => handleReportChange("yearly")}
          >
            Yearly Report
          </button>
        </div>
        {renderReport()}
      </div>
    </div>
  );
};

export default OrderReports;
