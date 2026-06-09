import { getTimeForCTAC, formatDateToCTAC } from "../time.js";

const loader = document.getElementById("loader");
const cards = document.getElementById("cardsContainer");

axios.interceptors.request.use((config) => {
  loader.classList.remove("d-none");
  return config;
});

axios.interceptors.response.use(
  (response) => {
    loader.classList.add("d-none");
    cards.classList.remove("d-none");
    return response;
  },
  (error) => {
    loader.classList.add("d-none");
    cards.classList.remove("d-none");
    return Promise.reject(error);
  },
);

const getSputnikPics = async () => {
  try {
    const { startDate, endDate } = getTimeForCTAC();

    const response = await axios.post(
      "https://earth-search.aws.element84.com/v1/search",
      {
        collections: ["sentinel-2-l2a"],
        bbox: [-74.3, 40.4, -73.6, 41.0],
        datetime: `${startDate}/${endDate}`,
        limit: 10,
      },
    );

    response.data.features.forEach((element) => {
      renderCard(element);
    });
  } catch (error) {
    throw error;
  }
};

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

  // собираем DOM
  body.appendChild(title);
  body.appendChild(date);
  body.appendChild(cloud);

  card.appendChild(img);
  card.appendChild(body);

  col.appendChild(card);
  container.appendChild(col);
};

getSputnikPics();
