# NASA APIs Explorer 🚀

A web application built with JavaScript, Axios, and Bootstrap that allows users to explore data from several NASA APIs.

## Overview

This project demonstrates working with REST APIs, asynchronous JavaScript, Axios interceptors, DOM manipulation, and Bootstrap components.

The application provides access to three different NASA-related data sources:

- 🌌 APOD (Astronomy Picture of the Day)
- 🌍 EPIC (Earth Polychromatic Imaging Camera)
- 🛰 Satellite Datasets (Sentinel-2 imagery)

---

## Features

### APOD (Astronomy Picture of the Day)

Displays astronomy pictures from the last 7 days using NASA's APOD API.

Features:

- Retrieves APOD entries from NASA API
- Filters only image content
- Displays images in a Bootstrap Carousel
- Shows:
  - Title
  - Description
  - Publication Date

### EPIC (Earth Polychromatic Imaging Camera)

Displays recent images of Earth captured by NASA's EPIC camera.

Features:

- Retrieves EPIC metadata from NASA API
- Dynamically generates image URLs
- Displays Earth images in a Bootstrap Carousel
- Shows:
  - Caption
  - Capture Date and Time
  - Latitude and Longitude Coordinates

### NASA Datasets

Displays Sentinel-2 satellite imagery from the Earth Search API.

Features:

- Searches imagery from the last 7 days
- Uses geographic coordinates around New York City
- Displays results as Bootstrap Cards
- Shows:
  - Satellite Platform
  - Acquisition Date
  - Cloud Coverage Percentage
  - Thumbnail Preview

---

## Technologies

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Axios
- Bootstrap 5
- NASA APIs
- Earth Search API

---

## API Endpoints

### APOD

```http
GET https://api.nasa.gov/planetary/apod
```

### EPIC

```http
GET https://epic.gsfc.nasa.gov/api/natural
```

### Earth Search

```http
POST https://earth-search.aws.element84.com/v1/search
```

---

## Project Structure

```text
project/
│
├── index.html
│
├── apod/
│   ├── apod.html
│   └── apod.js
│
├── epic/
│   ├── epic.html
│   └── epic.js
│
├── nasa datasets/
│   ├── datasets.html
│   └── datasets.js
│
├── time.js
└── README.md
```

---

## Key Concepts Demonstrated

### Axios Interceptors

Used to:

- Show loading spinner before requests
- Hide loading spinner after responses
- Handle request lifecycle globally

### Modular JavaScript

The application uses ES Modules:

```javascript
import { getTime } from "./time.js";
```

### Dynamic DOM Rendering

Content is generated dynamically using JavaScript:

- Bootstrap Carousel Items
- Bootstrap Cards
- Image Elements
- Metadata Blocks

---

## Installation

Clone the repository:

```bash
git clone https://github.com/omukhov/nasa-api-project.git
```

Navigate to the project:

```bash
cd nasa-api-project
```

Add your NASA API key:

```javascript
export const API_KEY = "YOUR_API_KEY";
```

Run the project using Live Server or any local web server.

---

## Learning Objectives

This project was created to practice:

- Working with third-party APIs
- Async/Await
- Axios
- JavaScript Modules
- DOM Manipulation
- Bootstrap Components
- Separation of Concerns
- Frontend Architecture Basics

---

## Future Improvements

- Search functionality
- Date range selection
- Error handling UI
- Responsive image optimization
- Infinite scrolling for datasets
- Favorites system using Local Storage

---

## Author

Artem Omukhov
