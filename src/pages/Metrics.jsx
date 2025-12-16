import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { createClient } from "@supabase/supabase-js";
// import Chart from "chart.js/auto";
// import { Line, Pie } from "react-chartjs-2";

const Metrics = () => {
  const [chart, setChart] = React.useState(null);
  // supabase setup
  const supabaseUrl = "https://pzqupoelaedeknqrrcay.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cXVwb2VsYWVkZWtucXJyY2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzY4NDQsImV4cCI6MjA4MTMxMjg0NH0.vFWkPmHRbyCM6gMl9ZrrRUFYN5rs1GK8nzxlJ1liMV8";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // // function to load specific graph based on form data
  // const getGraph = async (data) => {
  //   data.preventDefault();
  //   const metricData = new FormData(data.target);

  //   const type = metricData.get("metric_type");
  //   const period = metricData.get("period");

  //   if (type === "time_distribution") {
  //     await getPieGraph(period);
  //   } else {
  //     await getLineGraph(type, period);
  //   }
  // };
  // // function to load the time distribution graphs
  // const getPieGraph = async (period) => {
  //   const distribution = {};
  //   const today = new Date();

  //   let day = today.getDate();
  //   let month = today.getMonth() + 1;
  //   let year = today.getFullYear();

  //   let dateFilter;
  //   if (period === "day") {
  //     dateFilter = `${year}-${month}-${day - 1}`;
  //   } else if (period === "week") {
  //     dateFilter = `${year}-${month}-${day - 7}`;
  //   } else {
  //     dateFilter = `${year}-${month}-${day - 14}`;
  //   }
  //   // the format of the data rn is from time, to time, and category
  //   // i want the pie graph to show the distribution of time spent in each category
  //   // i'll need to:
  //   // get and filter the rows based on the time period the person asked for: if past day, filter only rows from yesterday; if past week, filter rows from past week; if past 2 weeks, yada yada
  //   const { data, error } = await supabase
  //     .from("time_tracker")
  //     .select("*")
  //     .gte("date", dateFilter);
  //   data.forEach((entry) => {
  //     if (entry.category in distribution) {
  //       distribution[entry.category] += 0.5;
  //     } else {
  //       distribution[entry.category] = 0.5;
  //     }
  //   });

  //   // from there, create a dictionary that will store [category]: [time]
  //   // go through each row and add the category with the value .5 if its non existent or add .5 if it does
  //   // then, use the data to generate pie chart with chart.js
  //   const labels = Object.keys(distribution);
  //   const chartData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: "Time Distribution (hours)",
  //         borderColor: "rgb(255, 99, 132)",
  //         data: Object.values(distribution),
  //       },
  //     ],
  //   };
  //   setChart(
  //     <div style={{ width: 650, textAlign: "center" }}>
  //       <h1 style={{ fontFamily: "monospace" }}>Time Distribution (hours)</h1>
  //       <Pie data={chartData} width={50} height={50} />
  //     </div>
  //   );
  // };

  // // function to load line graphs for fun level and meaning level
  // const getLineGraph = async (type, period) => {
  //   const categoryColors = {
  //     physical: "red",
  //     career: "blue",
  //     social: "green",
  //     family: "orange",
  //     financial: "purple",
  //     spiritual: "pink",
  //     intellectual: "yellow",
  //   };
  //   // different for daily and weekly/biweekly
  //   // if daily
  //   // still need to filter rows
  //   // use from column as x axis, fun or meaning level as y axis with chart js
  //   // if weekly
  //   // still need to filter rows
  //   // group data by date and calculate average fun/meaning level for each one
  //   // use date column as x axis, average fun or meaning level as y axis with chart js
  //   const today = new Date();

  //   let day = today.getDate();
  //   let month = today.getMonth() + 1;
  //   let year = today.getFullYear();

  //   let dateFilter;
  //   if (period === "day") {
  //     dateFilter = `${year}-${month}-${day - 1}`;
  //   } else if (period === "week") {
  //     dateFilter = `${year}-${month}-${day - 7}`;
  //   } else {
  //     dateFilter = `${year}-${month}-${day - 14}`;
  //   }

  //   const { data, error } = await supabase
  //     .from("time_tracker")
  //     .select("*")
  //     .gte("date", dateFilter);

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   const levels = {};
  //   data.forEach((entry) => {
  //     const key = period === "day" ? entry.from : entry.date;

  //     if (!levels[key]) levels[key] = { total: 0, count: 0, colors: [] };

  //     const value =
  //       type === "fun_level" ? entry.fun_level : entry.meaning_level;
  //     levels[key].total += value;
  //     levels[key].count += 1;
  //     levels[key].colors.push(categoryColors[entry.category] || "gray");
  //   });

  //   const labels = Object.keys(levels).sort();
  //   const values = labels.map(
  //     (label) => levels[label].total / levels[label].count
  //   );
  //   const colors = labels.map((label) => levels[label].colors[0]);

  //   const chartData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         label: type,
  //         data: values,
  //         borderColor: "gray",
  //         fill: false,
  //         pointBackgroundColor: colors,
  //         pointRadius: 6,
  //       },
  //     ],
  //   };

  //   setChart(
  //     <div style={{ width: 650, textAlign: "center" }}>
  //       <h1 style={{ fontFamily: "monospace" }}>Time Distribution</h1>
  //       <Line data={chartData} width={50} height={50} />
  //     </div>
  //   );
  // };
  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Your Metrics</h1>
        </div>
        <Navbar />
      </div>
      <div id="metric_info">
        <p>
          Here, you can see your time tracking metrics after completing your
          2-week sprint. This page will provide insights into how you spent your
          time and help you identify areas for improvement.
        </p>
      </div>
      <div id="var_selection">
        <form id="metric_form" onSubmit={getGraph}>
          <label htmlFor="metric_type">Choose Metric:</label>
          <select name="metric_type" id="metric_type">
            <option value="time_distribution">Time Distribution</option>
            <option value="fun_level">Fun Level</option>
            <option value="meaning_level">Meaning Level</option>
          </select>
          <br />
          <label htmlFor="period">Time Period</label>
          <select name="period" id="period">
            <option value="day">Past Day</option>
            <option value="week">Past Week</option>
            <option value="biweek">Past 2 Weeks</option>
          </select>
          <br />
          <button type="submit">Generate Metrics</button>
        </form>
        {chart}
      </div>
    </>
  );
};

export default Metrics;
