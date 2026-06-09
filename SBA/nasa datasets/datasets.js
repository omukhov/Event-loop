import { getTimeForCTAC, formatDateToCTAC } from "../time.js";

// Loader bootstrap
const loader = document.getElementById("loader");
// Get cards bootstrap
const cards = document.getElementById("cardsContainer");

// Interceptor for start loader
axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

// Response interceptor for finish loader and show cards
axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    cards.classList.remove("d-none");
    return response;
  },
  (error) => {
    // Any way finish loader and show cards
    loader.classList.add("d-none");
    cards.classList.remove("d-none");
    return Promise.reject(error);
  },
);

// Get sputnik pictures
const getSputnikPics = async () => {
  try {
    // Get start date and end date from time.js function
    const { startDate, endDate } = getTimeForCTAC();

    // Post request to another API for getting NYC data
    const response = await axios.post(
      "https://earth-search.aws.element84.com/v1/search",
      {
        collections: ["sentinel-2-l2a"],
        bbox: [-74.3, 40.4, -73.6, 41.0],
        datetime: `${startDate}/${endDate}`,
        limit: 12,
      },
    );

    return response.data.features;
  } catch (error) {
    throw error;
  }
};

// Render data
const renderData = (data) => {
  data.forEach((element) => {
    renderCard(element);
  });
};

// Render card
const renderCard = (element) => {
  const container = document.getElementById("cardsContainer");
  const col = document.createElement("div");
  col.className = "col-md-4";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.alt = "satellite image";
  img.src = element.assets?.thumbnail?.href || "";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = `🛰 ${element.properties.platform}`;

  const date = document.createElement("p");
  date.className = "card-text";
  date.textContent = `📅 ${formatDateToCTAC(element.properties.datetime)}`;

  const cloud = document.createElement("p");
  cloud.className = "card-text";
  cloud.textContent = `☁️ Cloud: ${element.properties["eo:cloud_cover"]}%`;

  body.appendChild(title);
  body.appendChild(date);
  body.appendChild(cloud);

  card.appendChild(img);
  card.appendChild(body);

  col.appendChild(card);
  container.appendChild(col);
};

// Init function
const init = async () => {
  try {
    const data = await getSputnikPics();
    renderData(data);
  } catch (error) {
    throw error;
  }
};

init();
