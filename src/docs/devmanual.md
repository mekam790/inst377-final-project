# Developer Manual

## Installation Guide

You can follow these steps to set up the application on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) installed (version 14 or higher).
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed. The link gives instructions based on your operating system.
- [Supabase Account](https://supabase.io/) and a project set up.
- [VSCode](https://code.visualstudio.com/) installed.

### Repository

1. Navigate to your desired folder and open the terminal in VSCode (shortcut is control + ` on Mac).
2. Run the command git clone https://github.com/mekam790/inst377-final-project.git. Follow the prompts.
3. Navigate into the project folder by running cd inst377-final-project.
   Note: The website's server is connected to an existing Supabase project. To connect to your own Supabase project, you will need to create a new project on Supabase and update the Supabase URL and public key in Tracking.jsx and Metrics.jsx.

### Dependencies

- You have to install the following dependencies:
  - Supabase JS Client (npm install @supabase/supabase-js)
  - Chart.js (npm install chart.js)
  - Day.js (npm install dayjs)
  - React Chart.js 2 (npm install react-chartjs-2)
  - React Router DOM (npm install react-router-dom)

## API Endpoints

The application uses 4 API calls across the Tracking.jsx and Metrics.jsx pages:

- Tracking: POST w/await supabase: Submits a new 30-minute timeblock into the database w/information.
- Tracking: GET w/await supabase: Gets all tracking data for the user and displays it as a timesheet.
- Metrics: GET w/await supabase: Gets time distribution data from specified date for the user and displays it as a pie chart.
- Metrics: GET w/await supabase: Gets fun level or meaning level data from specified date for the user and displays it as a line chart.

## Known Bugs

- Sometimes, the dependencies may not install correctly. If they don't, run these set of commands in the terminal:

```rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

This will remove the node-modules folder and package-lock.json file, clear the npm cache, reinstall everything and start the application again.

## Future Development Roadmap
- Implement user authentication to allow multiple users to track their time separately.
- Add a way to select the date to see on Metrics page.
- Add statistics like mean fun level and meaning level on Metrics page.
