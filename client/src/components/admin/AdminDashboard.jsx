import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
} from "recharts";
import userServices from "../../../services/userServices";

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsersChartData = async () => {
      try {
        const response = await userServices.getUsersPlotInfo();

        if (response) {
          setData(response.data);
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    getUsersChartData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-6 border rounded">
          <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                width={730}
                height={250}
                data={data.usersCreatedAtCount}
                barSize={50}
                barGap={6}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  // label={{ value: "Date", position: "insideBottom", offset: 0 }}
                />
                <YAxis
                  label={{
                    value: "users",
                    angle: -90,
                    // position: "insideLeft",
                    offset: "0",
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />

                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <div
              className="text-body-secondary top-0 end-0"
              style={{
                position: "absolute",
                top: 10,
                right: 5,
                padding: "10px",
                // backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>Active Users: {data.totalActiveUsers}</p>
              <p>Inactive Users: {data.totalNonActiveUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-sm-12 col-lg-6 border rounded">
          <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                width={730}
                height={250}
                data={data.contributionData}
                barSize={50}
                barGap={6}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  // label={{ value: "Date", position: "insideBottom", offset: 0 }}
                />
                <YAxis
                  label={{
                    value: "contributions",
                    angle: -90,
                    // position: "insideLeft",
                    offset: "0",
                  }}
                />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />

                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="totalUploads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <div
              className="text-body-secondary top-0 end-0"
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                padding: "5px",
                // backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p>Rescued: {data.totalRescued}</p>
              <p>Non-rescued: {data.totalNotRescued}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
