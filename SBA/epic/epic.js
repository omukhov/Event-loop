import { API_KEY } from "../keys.js";
import { createImageUrl, formatDateToCTAC } from "../time.js";

const loader = document.getElementById("loader");
const carouselExampleDark = document.getElementById("carouselExampleDark");

axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    carouselExampleDark.classList.remove("d-none");
    return response;
  },
  (error) => {
    loader.classList.add("d-none");
    carouselExampleDark.classList.remove("d-none");
    return Promise.reject(error);
  },
);

const getEpic = async () => {
  try {
    const response = await axios.get(
      `https://epic.gsfc.nasa.gov/api/natural?api_key=${API_KEY}`,
    );

    response.data.forEach((element, index) => {
      renderEPICLayout(element, index);
    });
  } catch (error) {
    throw error;
  }
};

const formatCoords = (coords) =>
  `Centroid coords: Latitude - ${coords.lat}, Longitude - ${coords.lon}`;

const renderEPICLayout = (epicElement, index) => {
  console.log(epicElement);
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItem = document.createElement("div");

  carouselItem.classList.add("carousel-item");

  if (index === 0) {
    carouselItem.classList.add("active");
  }

  const img = document.createElement("img");

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

getEpic();
