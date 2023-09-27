# 🌠 Fireball: Explore Meteorite Strikes 🌠

Welcome to the Fireball App! This application offers an immersive journey into the world of meteorite strikes throughout history. Dive deep into the data and customize your search criteria using various interactive visualizations, including an interactive map 🗺️ and insightful bar graphs 📊. The interactive map allows you to visualize the locations and masses of these celestial events, while the bar graphs provide you with summary metrics about these extraordinary occurrences. Embark on a cosmic exploration with this app! 🚀✨

## Overview

Meteorite strikes occur when meteorites approach Earth closely enough to be captured by its gravitational field. NASA🚀 maintains an extensive dataset of over 45,000 known meteorite strikes and sponsors research on these remarkable events. Our Chingu Voyage team has undertaken the mission to create an MVP (Minimum Viable Product) app that empowers users to explore this data in innovative and engaging ways.

## What is a Chingu Voyage?

Chingu Voyage is a collaborative learning program offered by Chingu, a vibrant community of developers and learners focused on helping individuals enhance their coding skills and create real-world projects. Chingu Voyages are structured, project-based learning experiences designed to replicate real-world development teams.

## Tech Stack

Frontend: HTML, CSS, Next.js, React ⚛️
This is purely a frontend-only application; no backend is involved.

## API

We utilized the Public API to retrieve meteorite strike data. [Public API](https://data.nasa.gov/resource/gh4g-9sfh.json)
The longitude and latitude data are transformed into location names using reverse geolocation.

## Components and Functionalities

### Search Component

Users can filter data by:

- Name (keyword input)
- Meteorite composition (recclass) (keyword input)
- Year of strike (slider)
- Mass range (slider)

A 'Reset' button allows users to clear search criteria and results.

Library used: [Tool Cool Range Slider](https://github.com/mzusin/toolcool-range-slider)

### Detail Data Display Component

Display one row for each meteorite strike in the dataset.
Features include sorting, selectable rows, and pagination.

Library used: [React Data Table Component](https://www.npmjs.com/package/react-data-table-component)

### Summary Metrics Component

#### Map

A choropleth map visually represents the following metrics with a range of red shades:

- Total number of strikes
- Average mass

Hovering over a country provides its name and data (Meteorite Strikes or Average Mass).
Hovering over a row in the table (or a click on mobile) displays the strike's geographic location as a dot with a mass range in a circle.

Library used: [D3](https://d3js.org/)

#### Bar Graph

A bar graph visually represents:

- Number of strikes by year
- Number of strikes by meteorite composition (recclass)

Library used: [Chart.js](https://www.chartjs.org/)

## Deployment

Deployed with Vercel 🚀 
[Live Link](https://fireballdata.vercel.app/)

## Team

- [@amirobinsonmuto](https://github.com/amirobinsonmuto) 👩‍💻
- [@bot-jamesschulz](https://github.com/bot-jamesschulz) 👨‍💻
- [@cgbridgewater](https://github.com/cgbridgewater) 👨‍💻
- [@ldietz08](https://github.com/ldietz08) 👩‍💻

## Feedback

We welcome your valuable feedback and suggestions to enhance the Fireball app. Please create an issue in our [GitHub repository](https://github.com/chingu-voyages/v45-tier2-team-23) if you encounter any issues or have ideas for improvements.

Thank you for embarking on this captivating journey into the world of meteorite strikes with us! Explore the cosmos in style with Fireball! 🌌🔭✨
