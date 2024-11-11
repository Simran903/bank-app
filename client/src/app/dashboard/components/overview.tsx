import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { baseUrl } from '@/constants';
import axiosClient from '@/constants/axiosClient';

interface TransferData {
  id: number;
  amount: number;
  timestamp: string;
}

const MonthlyExpenseChart: React.FC = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`${baseUrl}/transfer/sent`, {
          withCredentials: true,
        })

        const transfers: TransferData[] = response?.data?.data?.sentTransfers;
        
        const monthlyExpenses: { [key: string]: number } = {};

        transfers.forEach((transfer) => {
          const date = new Date(transfer.timestamp);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          monthlyExpenses[month] = (monthlyExpenses[month] || 0) + transfer.amount;
        });

        const labels = Object.keys(monthlyExpenses)?.sort();
        const data = labels?.map((month) => monthlyExpenses[month]);
        // console.log(data);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Monthly Expenses Over the Year</h2>
      {/* <Line data={chartData} options={{ responsive: true }} /> */}
    </div>
  );
};

export default MonthlyExpenseChart;