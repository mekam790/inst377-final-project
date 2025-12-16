import React from "react";
import "../App.css";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <div class="header">
        <div class="title">
          <h1>About Me</h1>
        </div>
        <Navbar />
      </div>
      <div className="paragraph">
        <p>
          Hi, my name is Michelle, and I am an Information Science major at UMD
          with a passion for making learning easier. I love learning, but I'm
          also lazy, so I want accessible and easy ways to learn more about
          myself and other topics.
        </p>
      </div>
      <div className="paragraph">
        <p>
          For this website, I used React for the frontend framework, Supabase
          for the backend, and libraries like Chart.js for data visualization. I
          chose these technologies because they were part of my assignment
          requirements and gave me extra credit, but I thought working with
          these technologies was incredibly useful because it taught me how to
          have patience when debugging, use problem formulation to make function
          development easier, and how to learn new technologies on my own.
        </p>
      </div>
      <div className="paragraph">
        <p>
          Like I mentioned, I had to learn how to be patient when debugging
          code. I hadn't used React in a while, so I had to relearn how to
          incorporate HTML, CSS, and JS in one page. I also had to learn how to
          use Supabase, which was a bit difficult at first because I had to
          figure out the format of my data when I submitted it and retrieved it,
          but after that initial hurdle, it became a lot easier to use.
        </p>
        <p>
          The hardest thing, however, was navigating Vercel deployment issues. I
          had a few times where I wanted to throw my laptop because I got an
          error for a file that I did not create. It got to a point where I had
          to create an entirely new project and migrate my code little by little
          to make sure there were no tiny dependency issues that stopped the
          website. Overall, I'm grateful for this project and I definitely want
          to expand on it later by adding authentication and more detailed
          metrics.
        </p>
      </div>
    </>
  );
};

export default About;
