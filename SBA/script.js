import { API_KEY } from "./keys.js";

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

// date
// :
// "2026-06-01"
// explanation
// :
// "Telescopic views of Saturn and its beautiful rings often make it the star of star parties. But this stunning view of the outer gas gaint planet's rings and night side just isn't possible from telescopes in the vicinity of planet Earth. Peering out from the inner Solar System they can only bring Saturn's day side into view. In fact, this image of Saturn's slender sunlit crescent with the planet's night shadow cast across its broad and complex ring system was captured by the robot spacecraft Cassini. After a seven year long journey from planet Earth, Cassini called Saturn orbit home for 13 years (from 2004 - 2017) before it was directed to dive into the atmosphere of the gas giant on September 15, 2017. This magnificent mosaic is composed of frames recorded by Cassini's wide-angle camera only two days before its grand final plunge. And Saturn's night will not be seen again until another spaceship from Earth calls."
// hdurl
// :
// "https://apod.nasa.gov/apod/image/2605/LastRingPortrait_Cassini_4472.jpg"
// media_type
// :
// "image"
// service_version
// :
// "v1"
// title
// :
// "Saturn at Night"
// url
// :
// "https://apod.nasa.gov/apod/image/2605/LastRingPortrait_Cassini_1080.jpg"

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
