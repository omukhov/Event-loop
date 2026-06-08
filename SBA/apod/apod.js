import { API_KEY } from "../keys.js";

const loader = document.getElementById("loader");
const carouselExampleControls = document.getElementById(
  "carouselExampleControls",
);

axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    carouselExampleControls.classList.remove("d-none");
    return response;
  },
  (error) => {
    loader.classList.add("d-none");
    carouselExampleControls.classList.remove("d-none");
    return Promise.reject(error);
  },
);

const getTime = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  const endDate = today.toISOString().split("T")[0];
  const startDate = weekAgo.toISOString().split("T")[0];

  return { endDate, startDate };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getDate()} ${date.toLocaleDateString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
};

// Astronomy Picture of the Day
const getAPOD = async () => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${getTime().startDate}&end_date=${getTime().endDate}`,
    );

    const apods = response.data.filter((item) => item.media_type === "image");

    apods.forEach((element, index) => {
      renderAPODLayout(element, index === 0);
    });
  } catch (error) {
    console.log(error);
  }
};

const renderAPODLayout = (APODData, isActive = false) => {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");
  const carouselTitle = document.createElement("h2");
  const carouselExplanation = document.createElement("p");
  const carouselDate = document.createElement("div");
  const carouselImg = document.createElement("img");

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

getAPOD();
