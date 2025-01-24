import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import dummyData from "../assets/dummy.json";

const AnalyticsDashboard = () => {
  const {
    monthlySales,
    productCategories,
    yearlyPerformance,
    dailyActiveUsers,
    employeeRatings,
    salesTrends,
    regionalSales,
    userGrowth,
  } = dummyData.data;

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Monthly Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Product Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productCategories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Regional Sales Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={regionalSales}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="sales"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {regionalSales.map((entry, index) => (
                <Cell
                  key={`cell-${entry.region}`}
                  fill={COLORS[index % COLORS.length]}
                  name={entry.region}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`$${value}`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Yearly Performance by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearlyPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="electronics" stackId="a" fill="#0088FE" />
            <Bar dataKey="furniture" stackId="a" fill="#00C49F" />
            <Bar dataKey="clothing" stackId="a" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Daily Active Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyActiveUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#82CA9D" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Employee Ratings Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={employeeRatings}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="count"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {employeeRatings.map((entry, index) => (
                <Cell
                  key={`cell-${entry.rating}`}
                  fill={COLORS[index % COLORS.length]}
                  name={entry.rating}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Sales Trends: Online vs Offline
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={salesTrends}>
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="onlineSales" barSize={20} fill="#0088FE" />
            <Line type="monotone" dataKey="offlineSales" stroke="#FF8042" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#8884d8"
              name="New Users"
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              stroke="#82ca9d"
              name="Active Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
