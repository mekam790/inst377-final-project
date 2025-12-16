import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div class="header">
        <div class="title">
          <h1>The Optimization Problem</h1>
        </div>
        <Navbar />
      </div>
      <div id="intro">
        <p>
          This website is meant to help you track your time to learn how to
          spend it more meaningfully. Because time is a precious resource that
          we can't get back, it's important that it's used intentionally. Make
          your way to the tracking page to start your 2-week sprint.
        </p>
      </div>
    </>
  );
};

export default Home;
