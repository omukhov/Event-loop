import { API_KEY } from "../keys.js";
import { formatDate, getTime } from "../time.js";

// Loader bootstrap
const loader = document.getElementById("loader");
const carouselExampleControls = document.getElementById(
  "carouselExampleControls",
);

// Request interceptor for starting loader
axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

// Response interceptor for finish loader and show carousel
axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    carouselExampleControls.classList.remove("d-none");
    return response;
  },
  (error) => {
    // Any way we finish loader and show carousel, even though we got error
    loader.classList.add("d-none");
    carouselExampleControls.classList.remove("d-none");
    return Promise.reject(error);
  },
);

// Astronomy Picture of the Day
const getAPODs = async () => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${getTime().startDate}&end_date=${getTime().endDate}`,
    );

    const apods = response.data.filter((item) => item.media_type === "image");

    return apods;
  } catch (error) {
    throw error;
  }
};

// Render function apod
const renderAPODs = (apods) => {
  apods.forEach((element, index) => {
    renderAPODLayout(element, index === 0);
  });
};

// Render layout apod
const renderAPODLayout = (APODData, isActive = false) => {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");
  const carouselTitle = document.createElement("h2");
  const carouselExplanation = document.createElement("p");
  const carouselDate = document.createElement("div");
  const carouselImg = document.createElement("img");

  // Put active class for carousel
  if (isActive) {
    carouselItem.classList.add("active");
  }

  carouselImg.src = APODData.url;
  carouselImg.classList.add("d-block", "w-100");
  carouselTitle.textContent = APODData.title;
  carouselDate.textContent = formatDate(APODData.date);
  carouselDate.style.fontFamily = "Bodoni";
  carouselExplanation.textContent = APODData.explanation;

  carouselItem.appendChild(carouselTitle);
  carouselItem.appendChild(carouselExplanation);
  carouselItem.appendChild(carouselDate);
  carouselItem.appendChild(carouselImg);
  carouselInner.appendChild(carouselItem);
};

// Init function apod
const init = async () => {
  try {
    const apods = await getAPODs();
    renderAPODs(apods);
  } catch (error) {
    throw error;
  }
};

init();
