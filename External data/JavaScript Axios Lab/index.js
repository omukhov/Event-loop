import * as Carousel from "./Carousel.js";
import { API_KEY } from "./keys.js";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
let progressInterval;

const headers = {
  "Content-Type": "application/json",
  "x-api-key": `${API_KEY}`,
};

axios.interceptors.request.use((config) => {
  config.metadata = {
    startTime: Date.now(),
  };
  let progress = 0;
  setProgress(progress);

  progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += 10;
      setProgress(progress);
    }
  }, 200);

  progressBar.style.width = "0%";
  document.body.style.cursor = "progress";

  console.log(`Request started: ${config.url}`);

  return config;
});

axios.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;

    console.log(`Response received: ${response.config.url} (${duration} ms)`);
    document.body.style.cursor = "default";

    clearInterval(progressInterval);

    setProgress(100);

    setTimeout(() => {
      setProgress(0);
    }, 300);

    return response;
  },
  (error) => {
    if (error.config?.metadata) {
      const duration = Date.now() - error.config.metadata.startTime;

      console.log(`Request failed: ${error.config.url} (${duration} ms)`);
    }

    clearInterval(progressInterval);
    return Promise.reject(error);
  },
);

const setProgress = (percent) => (progressBar.style.width = `${percent}%`);

const updateProgress = (progressEvent) => {
  console.log(progressEvent);
};

async function initialLoad() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
      onDownloadProgress: (progressEvent) => {
        updateProgress(progressEvent);
      },
      headers,
    });

    response.data.forEach((breed) => {
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

const fetchBreed = async (id) =>
  await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=5`,
    { headers },
  );

breedSelect.addEventListener("change", async (e) => {
  try {
    Carousel.clear();

    const breed = await fetchBreed(e.target.value);

    console.log(breed.data);

    if (breed.data.length === 0) {
      const notFoundDiv = document.createElement("div");
      notFoundDiv.style.display = "flex";
      notFoundDiv.style.justifyContent = "center";
      notFoundDiv.style.alignContent = "center";
      notFoundDiv.style.height = "100vh";
      notFoundDiv.textContent = "Breed not found";
      notFoundDiv.style.fontSize = "16pt";
      notFoundDiv.style.fontWeight = "Bold";
      document.body.appendChild(notFoundDiv);
    }

    addDataToCarousel(breed.data, {
      imgSrc: (responseItem) => responseItem.url,
      imgAlt: (responseItem) => responseItem.breeds[0].alt_names,
      imgId: (responseItem) => responseItem.id,
    });
  } catch (error) {
    console.log(error);
  }
});

export async function favourite(imgId) {
  try {
    const favourites = await getFavourites();
    const existingFavourite = favourites.data.find(
      (fav) => fav.image_id === imgId,
    );

    if (existingFavourite) {
      await axios.delete(
        `https://api.thecatapi.com/v1/favourites/${existingFavourite.id}`,
        { headers },
      );

      Carousel.clear();

      const newFavourites = favourites.data.filter(
        (fav) => fav.image_id !== imgId,
      );

      addDataToCarousel(newFavourites, {
        imgSrc: (responseItem) => responseItem.image.url,
        imgAlt: (responseItem) => responseItem.user_id,
        imgId: (responseItem) => responseItem.image_id,
      });
    } else {
      const rawBody = JSON.stringify({
        image_id: imgId,
      });
      const newFavourite = await axios.post(
        "https://api.thecatapi.com/v1/favourites",
        { image_id: imgId },
        { headers },
      );
    }
  } catch (error) {
    console.log(error);
  }
}

const getFavourites = async () => {
  try {
    return await axios.get("https://api.thecatapi.com/v1/favourites", {
      headers,
    });
  } catch (error) {
    console.log(error);
  }
};

const addDataToCarousel = (response, config) => {
  response.forEach((responseItem) => {
    Carousel.start();

    const carouselItem = Carousel.createCarouselItem(
      config.imgSrc(responseItem),
      config.imgAlt(responseItem),
      config.imgId(responseItem),
    );
    Carousel.appendCarousel(carouselItem);
  });
};

getFavouritesBtn.addEventListener("click", async () => {
  const favourites = await getFavourites();
  Carousel.clear();
  addDataToCarousel(favourites.data, {
    imgSrc: (responseItem) => responseItem.image.url,
    imgAlt: (responseItem) => responseItem.user_id,
    imgId: (responseItem) => responseItem.image_id,
  });
});
