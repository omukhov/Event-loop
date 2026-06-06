import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";

// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Header for fetch
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": `${API_KEY}`,
});

let requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

// Function for get data
async function initialLoad() {
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/breeds",
      requestOptions,
    );

    const breeds = await response.json();
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
    Carousel.start();
  } catch (error) {
    console.log(error);
  }
}

initialLoad();

// Getting breed
const fetchBreed = async (id) =>
  (
    await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=10`,
      requestOptions,
    )
  ).json();

// listener for select
breedSelect.addEventListener("change", async (e) => {
  Carousel.clear();

  const breed = await fetchBreed(e.target.value);
  breed.forEach((item) => {
    Carousel.start();
    const breedItem = Carousel.createCarouselItem(
      item.url,
      item.breeds[0].alt_names,
      item.id,
    );
    Carousel.appendCarousel(breedItem);
  });
});
