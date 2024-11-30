import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axiosClient from '@/constants/axiosClient';

interface TransferData {
  id: number;
  amount: number;
  timestamp: string;
}

const MonthlyExpenseChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [] as number[],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [hasData, setHasData] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/transfer/sent`, {
          withCredentials: true,
        });

        const transfers: TransferData[] = response?.data?.data?.sentTransfers || [];

        if (transfers.length === 0) {
          setHasData(false);
          return;
        }

        const monthlyExpenses: { [key: string]: number } = {};

        transfers.forEach((transfer) => {
          const date = new Date(transfer.timestamp);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transfer.amount;
        });

        const labels = Object.keys(monthlyExpenses).sort();
        const data = labels.map((month) => monthlyExpenses[month]);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Monthly Expenses',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
        setHasData(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Monthly Expenses Over the Year</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : hasData ? (
        <Line data={chartData} options={{ responsive: true }} />
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </div>
  );
};

export default MonthlyExpenseChart;