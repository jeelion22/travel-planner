import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "../styles/ContributorDashboard.css";

const ContributorDashboard = ({ userInfo }) => {
  const contributions = userInfo.contributions || [];
  const totalContributions = contributions.length;
  const totalRescued = contributions.filter(
    (contribution) => contribution.status === "rescued"
  ).length;
  const successRate =
    Math.round((totalRescued / totalContributions) * 100) || 0;

  const successRateData = [
    { name: "Rescued", value: totalRescued },
    { name: "Not Rescued", value: totalContributions - totalRescued },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="container glassy-container">
      <div className="row mb-2">
        <div className="col-md-12 text-center p-4 border rounded glassy-header shadow-lg">
          <h2>Welcome, {userInfo.firstname}</h2>
          <p>Here is the summary of your contributions.</p>
        </div>
      </div>

      <div className="row mb-2 p-2 border rounded  glassy-stats text-center">
        <div className="col-md-6 ">
          <h4>Total Contributions: {totalContributions}</h4>
        </div>
        <div className="col-md-6">
          <h3>Total Rescued: {totalRescued}</h3>
        </div>
      </div>

      <div className="row mb-4 border rounded p-2 glassy-chart ">
        <div className="col-md-12 text-center">
          <h6 style={{ color: "#254336" }}>Success Rate: {successRate}%</h6>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={successRateData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {successRateData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ContributorDashboard;
