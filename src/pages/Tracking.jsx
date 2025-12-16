import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
// import Clock from 'react-live-clock';
import { createClient } from "@supabase/supabase-js";

const Tracking = () => {
  // supabase setup
  const supabaseUrl = "https://pzqupoelaedeknqrrcay.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cXVwb2VsYWVkZWtucXJyY2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzY4NDQsImV4cCI6MjA4MTMxMjg0NH0.vFWkPmHRbyCM6gMl9ZrrRUFYN5rs1GK8nzxlJ1liMV8";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // get current date and time
  const date = new Date();
  const showDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  // // function to get sleep time and set min and max for time inputs
  // const getSleepTime = (data) => {
  //   const confirmation = document.getElementById("sleep_confirm");
  //   data.preventDefault();
  //   const sleepData = new FormData(data.target);
  //   const sleepFrom = sleepData.get("sleep_from");
  //   const sleepTo = sleepData.get("sleep_to");
  //   const timeFrom = document.getElementById("time_from");
  //   const timeTo = document.getElementById("time_to");

  //   timeFrom.min = sleepTo;
  //   timeFrom.max = sleepFrom;
  //   timeTo.min = sleepTo;
  //   timeTo.max = sleepFrom;
    
  //   confirmation.innerHTML = "Sleep time set from " + sleepFrom + " to " + sleepTo;
  // };

  // function when form is submitted
  const submitTracking = async (data) => {
    data.preventDefault();
    console.log(data.time_from);
    console.log(data.time_to);
    const timeData = new FormData(data.target);

    const timeEntry = {
      from: timeData.get("time_from"),
      to: timeData.get("time_to"),
      activity: timeData.get("activity"),
      category: timeData.get("category"),
      fun_level: Number(timeData.get("fun_level")),
      meaning_level: Number(timeData.get("meaning_level")),
    };
    const { error } = await supabase.from("time_tracker").insert([timeEntry]);

    if (error) {
      console.log("Error inserting time entry:", error);
    }
    await getData();
    data.target.reset();
  };

  const getData = async () => {
    console.log("getData called");
    const categoryDisplay = document.getElementById("current-category");
    const timesheet = document
      .getElementById("timesheet")
      .getElementsByTagName("tbody")[0];
    timesheet.innerHTML = "";

    const { data, error } = await supabase.from("time_tracker").select("*");

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    data.forEach((entry) => {
      const timeBlock = timesheet.insertRow();
      const timeCell = timeBlock.insertCell(0);
      const activityCell = timeBlock.insertCell(1);
      const categoryCell = timeBlock.insertCell(2);
      timeCell.innerHTML = entry.from + " - " + entry.to;
      activityCell.innerHTML = entry.activity;
      categoryCell.innerHTML = entry.category;

      categoryDisplay.innerHTML = entry.category;
    });
  };
  return (
    <>
      <div class="header">
        <div class="title">
          <h1>Track Time</h1>
        </div>
        <Navbar />
      </div>
      <div id="tracking-intro">
        <p>
          Use the form below to track how much time you spend on different
          activities throughout your day. Select the time block, log your
          activity in a few words, the time category, and the level of fun and
          meaning on a scale of 1-4.
        </p>
        <p>
          Categories: - Career can mean your work if you are employed, or school
          if you are a student, so the time you spend in classes or studying.
        </p>
      </div>
      <div id="date">
        {/* not dynamic yet*/}
        <h3>Current Date: {showDate}</h3>
      </div>
      {/* <div id="timebox">
        <h3>Current Time:</h3>
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"US/Eastern"} />
        <h3>Current Category:</h3>
        <h5 id="current-category"></h5>
      </div>
      <div id="sleepbox">
        <h2>Sleep Time Entry</h2>
        <p>Input your sleeping hours to restrict the hours you track.</p>
        <form id="sleep-form" onSubmit={getSleepTime}>
          <label for="sleep_from">Time Block Start:</label>
          <input
            type="time"
            id="sleep_from"
            name="sleep_from"
            step="1800"
            required
          />
          <br />
          <label for="sleep_to">Time Block End:</label>
          <input
            type="time"
            id="sleep_to"
            name="sleep_to"
            step="1800"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        <h3 id="sleep_confirm"></h3>
      </div> */}
      <div id="form">
        <form id="tracking-form" onSubmit={submitTracking}>
          <label for="time_from">Time Block Start:</label>
          <input
            type="time"
            id="time_from"
            name="time_from"
            step="1800"
            required
          />
          <br />
          <label for="time_to">Time Block End:</label>
          <input type="time" id="time_to" name="time_to" step="1800" required />
          <br />
          <label for="activity">Activity:</label>
          <input type="text" id="activity" name="activity" required />
          <br />
          <label for="category">Category:</label>
          <select id="category" name="category" required>
            <option value="career">Career</option>
            <option value="financial">Financial</option>
            <option value="spiritual">Spiritual</option>
            <option value="physical">Physical</option>
            <option value="intellectual">Intellectual</option>
            <option value="family">Family</option>
            <option value="social">Social</option>
          </select>
          <br />
          <label for="fun_level">Fun Level (1-4):</label>
          <input
            type="number"
            id="fun_level"
            name="fun_level"
            min="1"
            max="4"
            required
          />
          <br />
          <label for="meaning_level">Meaning Level (1-4):</label>
          <input
            type="number"
            id="meaning_level"
            name="meaning_level"
            min="1"
            max="4"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div id="timesheetbox">
        <h2>Your Time Entries</h2>
        <div id="entries-list">
          <table id="timesheet">
            <thead>
              <tr>
                <th>Time</th>
                <th>Activity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tracking;
