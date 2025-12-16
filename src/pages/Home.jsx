import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="header">
        <div className="title">
          <h1>The Optimization Problem</h1>
        </div>
        <Navbar />
      </div>
      <div className="paragraph">
        <p>
          This website is meant to help you track your time to learn how to
          spend it more meaningfully. Because time is a precious resource that
          we can't get back, it's important that it's used intentionally.
        </p>
      </div>
      <div className="paragraph">
        <p>
          The idea from this website was inspired by Cassie Holmes's book, The
          Happier Hour. In this book, Holmes highlights how everyone has the
          same 24 hours in a day, but that the fulfillment we feel in these
          hours varies greatly among people. She then postulates that if we are
          more conscious of the time we spend, we can craft our time to be
          happier.
        </p>
      </div>
      <div className="paragraph">
        <p>
          This website aims to make that process easier by allowing you to log
          your time in 30-minute increments and provide detail on the activity
          you did, the life category it fell in, and the self-perceived level of
          fun and meaning from that activity. Doing this over the course of two
          weeks allows for a clearer picture of how you spend your time
          regularly. Afterwards, you'll then use the Metrics tab to visualize
          your time distribution over the course of the past day, week, or 2
          weeks.
        </p>
      </div>
      <div className="paragraph">
        <p>With that, head to the Tracking page to start logging your hours.</p>
        <button type="button" className="button">
          <NavLink to="/tracking" className="link">Tracking</NavLink>
        </button>
      </div>
    </>
  );
};

export default Home;
