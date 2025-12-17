import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Clock from "../components/Clock";
import { createClient } from "@supabase/supabase-js";

const Tracking = () => {
  // supabase setup
  const supabaseUrl = "https://pzqupoelaedeknqrrcay.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cXVwb2VsYWVkZWtucXJyY2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzY4NDQsImV4cCI6MjA4MTMxMjg0NH0.vFWkPmHRbyCM6gMl9ZrrRUFYN5rs1GK8nzxlJ1liMV8";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // get current date and time
  const date = new Date();
  let showDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  // decimal to time calculator
  const timeConvert = (decimal) => {
    const hour = Math.floor(decimal);
    const minute = (decimal - hour) * 60;
    if (minute < 10) {
      if (hour < 10) {
        return `0${hour}:0${minute}`;
      } else return `${hour}:0${minute}`;
    } else {
      if (hour < 10) {
        return `0${hour}:${minute}`;
      } else return `${hour}:${minute}`;
    }
  };

  // function to load options for from and to time inputs based on sleep time
  const getTimeOptions = (data) => {
    data.preventDefault();
    const sleepData = new FormData(data.target);
    // example sleepFrom = 0, sleepTo = 7.5
    const sleepFrom = Number(sleepData.get("sleep_from"));
    const sleepTo = Number(sleepData.get("sleep_to"));
    console.log(sleepFrom, sleepTo);

    let timeblock_num = 48;
    let sleep_timeblock = (sleepTo - sleepFrom) * 2;

    timeblock_num -= sleep_timeblock;
    console.log(timeblock_num);

    const fromSelect = document.getElementById("time_from");
    const toSelect = document.getElementById("time_to");

    let from_option = sleepTo;
    // why is sleepTo 80 here; the data from the form were strings
    let to_option = sleepTo + 0.5;
    console.log(from_option, to_option);

    while (timeblock_num > 0) {
      if (from_option >= 24) {
        from_option = 0;
      }
      if (to_option >= 24) {
        to_option = 0;
      }

      let from = document.createElement("option");
      let to = document.createElement("option");

      from.value = from.innerHTML = timeConvert(from_option);
      to.value = to.innerHTML = timeConvert(to_option);
      console.log(from.value, to.value);

      fromSelect.appendChild(from);
      toSelect.appendChild(to);

      from_option += 0.5;
      to_option += 0.5;

      timeblock_num -= 1;
    }
  };

  // function to remove entry from timesheet
  const removeEntry = async (entryId) => {
    const { error } = await supabase
      .from("time_tracker")
      .delete()
      .eq("id", entryId);

    if (error) {
      console.log(error);
    } else {
      await getData();
    }
  };
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
    const categoryDisplay = document.getElementById("current_category");
    const timesheet = document
      .getElementById("timesheet")
      .getElementsByTagName("tbody")[0];
    timesheet.innerHTML = "";

    const { data, error } = await supabase
      .from("time_tracker")
      .select("*")
      .gte("date", showDate);

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }

    data.forEach((entry) => {
      const timeBlock = timesheet.insertRow();
      const removeCell = timeBlock.insertCell(0);
      const timeCell = timeBlock.insertCell(1);
      const activityCell = timeBlock.insertCell(2);
      const categoryCell = timeBlock.insertCell(3);
      const removeButton = document.createElement("button");
      removeButton.className = "button";
      removeButton.innerHTML = "Remove";
      removeButton.onclick = () => removeEntry(entry.id);

      removeCell.appendChild(removeButton);
      timeCell.innerHTML = `${entry.from}-${entry.to}`;
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
      <div id="tracking_intro">
        <p>
          Use the form below to track how much time you spend on different
          activities throughout your day. Select the time block, log your
          activity in a few words, the time category, and the level of fun and
          meaning on a scale of 1-4.
        </p>
        <p>Categories:</p>
        <ul>
          <li>
            Physical: activities to do with your body, like eating, movement,
            etc
          </li>
          <li>
            Career: can mean your work if you are employed, or school if you are
            a student, so the time you spend in classes or studying
          </li>
          <li>
            Financial: activities related to managing your money, like budgeting
            or paying bills
          </li>
          <li>Spiritual: activities like meditation or prayer</li>
          <li>
            Intellectual: activities that stimulate your mind, like reading or
            puzzles
          </li>
          <li>Family: time spent with family</li>
          <li>
            Social: time spent with friends or in social settings, like hangouts
          </li>
        </ul>
      </div>
      <div className="main">
        <div id="timebox">
          <div id="date">
            {/* not dynamic yet*/}
            <h3>Current Date: {showDate}</h3>
          </div>
          <h3>Current Time:</h3>
          <Clock />
          <h3>Current Category:</h3>
          <p className="info" id="current_category"></p>
        </div>
        <div id="sleepbox">
          <h2>1. Sleep Time Entry</h2>
          <p>
            Input your sleeping time in hours to restrict the hours you track.
            For example, if you sleep from 12 midnight to 7:30, put in 0 for
            From and 7.5 for To.
          </p>
          <form id="sleep_form" onSubmit={getTimeOptions}>
            <label htmlFor="sleep_from">Time Block Start:</label>
            <input type="number" id="sleep_from" name="sleep_from" required />
            <br />
            <label htmlFor="sleep_to">Time Block End:</label>
            <input type="number" id="sleep_to" name="sleep_to" required />
            <br />
            <button type="submit" className={"submit"}>
              Submit
            </button>
          </form>
        </div>
        <div id="form">
          <h2>2. Activity Time Entry</h2>
          <form id="tracking_form" onSubmit={submitTracking}>
            <label htmlFor="time_from">Time Block Start:</label>
            <select id="time_from" name="time_from" required></select>
            <br />
            <label htmlFor="time_to">Time Block End:</label>
            <select id="time_to" name="time_to" required></select>
            <br />
            <label htmlFor="activity">Activity:</label>
            <input type="text" id="activity" name="activity" required />
            <br />
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required>
              <option value="physical">Physical</option>
              <option value="career">Career</option>
              <option value="financial">Financial</option>
              <option value="spiritual">Spiritual</option>
              <option value="intellectual">Intellectual</option>
              <option value="family">Family</option>
              <option value="social">Social</option>
            </select>
            <br />
            <label htmlFor="fun_level">Fun Level (1-4):</label>
            <input
              type="number"
              id="fun_level"
              name="fun_level"
              min="1"
              max="4"
              required
            />
            <br />
            <label htmlFor="meaning_level">Meaning Level (1-4):</label>
            <input
              type="number"
              id="meaning_level"
              name="meaning_level"
              min="1"
              max="4"
              required
            />
            <br />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div id="timesheetbox">
        <h2>Your Time Entries</h2>
        <button type="button" className="button" onClick={getData}>
          Show Today's Entries
        </button>
        <div id="entries_list">
          <table id="timesheet">
            <thead>
              <tr>
                <th>Remove Entry</th>
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
