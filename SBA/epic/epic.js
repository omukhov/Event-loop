import { API_KEY } from "../keys.js";
import { createImageUrl, formatDateToCTAC } from "../time.js";

// Get bootstrap loader
const loader = document.getElementById("loader");
// Get carousel
const carouselExampleDark = document.getElementById("carouselExampleDark");

// Request interceptor for starting loader
axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

// Response interceptor for finish loader and show carousel
axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    carouselExampleDark.classList.remove("d-none");
    return response;
  },
  (error) => {
    // Any way we finish loader and show carousel, even though we got error
    loader.classList.add("d-none");
    carouselExampleDark.classList.remove("d-none");
    return Promise.reject(error);
  },
);

// Getting data from nasa api
const getEpic = async () => {
  try {
    const response = await axios.get(
      `https://epic.gsfc.nasa.gov/api/natural?api_key=${API_KEY}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Render array function
const renderEpic = (epicData) => {
  epicData.forEach((element, index) => {
    renderEPICLayout(element, index);
  });
};

// Format coords from object to string
const formatCoords = (coords) =>
  `Centroid coords: Latitude - ${coords.lat}, Longitude - ${coords.lon}`;

// Render layout epic
const renderEPICLayout = (epicElement, index) => {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItem = document.createElement("div");

  carouselItem.classList.add("carousel-item");

  // condition for put active class first element carousel
  if (index === 0) {
    carouselItem.classList.add("active");
  }

  const img = document.createElement("img");

  // Used function for creating image
  img.src = createImageUrl(epicElement);
  img.alt = epicElement.caption;
  img.classList.add("d-block", "w-100");

  const caption = document.createElement("h5");
  const date = document.createElement("div");
  const coords = document.createElement("div");

  coords.classList.add("mb-3");

  caption.textContent = epicElement.caption;
  date.textContent = `📅  ${formatDateToCTAC(epicElement.date)}`;
  coords.textContent = `🗺️ ${formatCoords(epicElement.centroid_coordinates)}`;

  carouselItem.appendChild(caption);
  carouselItem.appendChild(date);
  carouselItem.appendChild(coords);
  carouselItem.appendChild(img);

  carouselInner.appendChild(carouselItem);
};

// Init function
const init = async () => {
  try {
    const epicData = await getEpic();
    renderEpic(epicData);
  } catch (error) {
    throw error;
  }
};

init();
