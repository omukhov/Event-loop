# 🐱 Cat Browser App

## Overview

Cat Browser App is a JavaScript web application that uses **The Cat API** to display cat breeds and images. Users can browse breeds, view images in a Bootstrap carousel, and save favorite cats.

The application demonstrates:

* API integration with Axios
* Axios interceptors
* Dynamic DOM manipulation
* Bootstrap Carousel
* Favorites management
* Progress bar implementation
* Modular JavaScript architecture

---

## Features

### Breed Selection

When the application loads, it requests all available cat breeds from The Cat API and populates the dropdown menu.

Users can:

* Select a breed from the dropdown
* Load up to 5 images for the selected breed
* Browse images using a carousel

---

### Favorites System

Users can add or remove images from their favorites list.

Favorite images are stored using The Cat API Favorites endpoint.

Actions:

* Add image to favorites
* Remove image from favorites
* Display all favorite images

---

### Loading Progress Bar

The application includes a custom top progress bar.

Features:

* Starts automatically before each request
* Simulates progress up to 90%
* Completes at 100% when the response arrives
* Resets after completion

---

### Request Timing

Axios interceptors measure request duration.

Example output:

```text
Request started: https://api.thecatapi.com/v1/breeds
Response received: https://api.thecatapi.com/v1/breeds (254 ms)
```

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6 Modules)

### Libraries

* Axios
* Bootstrap 5
* jQuery

### External API

* The Cat API

---

## Project Structure

```text
project/
│
├── index.html
├── styles.css
├── index.js
├── Carousel.js
├── keys.js
│
└── README.md
```

### File Responsibilities

#### index.js

Main application logic:

* API communication
* Event listeners
* Axios interceptors
* Favorites management
* Carousel population

#### Carousel.js

Handles:

* Carousel initialization
* Carousel item creation
* Appending items
* Clearing existing items

#### keys.js

Stores API key:

```javascript
export const API_KEY = "YOUR_API_KEY";
```

#### styles.css

Contains:

* Layout styling
* Progress bar styling
* Favorite button animations
* Carousel responsiveness

---

## API Endpoints

### Get All Breeds

```http
GET https://api.thecatapi.com/v1/breeds
```

### Get Breed Images

```http
GET https://api.thecatapi.com/v1/images/search?breed_ids={breedId}&limit=5
```

### Get Favorites

```http
GET https://api.thecatapi.com/v1/favourites
```

### Add Favorite

```http
POST https://api.thecatapi.com/v1/favourites
```

Request Body:

```json
{
  "image_id": "abc123"
}
```

### Remove Favorite

```http
DELETE https://api.thecatapi.com/v1/favourites/{favoriteId}
```

---

## Application Flow

### Initial Load

1. Application starts.
2. Breed list is requested.
3. Dropdown menu is populated.
4. Carousel is initialized.

### Breed Selection

1. User selects a breed.
2. Images are requested from API.
3. Existing carousel items are cleared.
4. New images are rendered.

### Favorite Toggle

1. User clicks heart icon.
2. Application checks existing favorites.
3. If favorite exists:

   * Delete favorite.
4. Otherwise:

   * Create favorite.

### View Favorites

1. User clicks "Get Favorites".
2. Favorites are requested.
3. Carousel displays favorite images.

---

## Error Handling

All API requests are wrapped in `try/catch` blocks.

Examples:

```javascript
try {
  const response = await axios.get(url);
} catch (error) {
  console.log(error);
}
```

---

## Future Improvements

* Store favorites locally
* Add breed information panel
* Search breeds
* Pagination
* Dark mode
* Toast notifications
* Real download progress using `onDownloadProgress`
* Unit tests
* TypeScript migration

---

## Learning Objectives

This project demonstrates knowledge of:

* Async/Await
* Promises
* REST APIs
* Axios
* Axios Interceptors
* DOM Manipulation
* Event Handling
* Modular JavaScript
* Responsive Design
* Bootstrap Components

---

## Author

Artem Omukhov

Frontend Developer Project

Built using JavaScript, Axios, Bootstrap, and The Cat API.
