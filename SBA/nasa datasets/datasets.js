import { getTimeForCTAC, formatDateToCTAC } from "../time.js";

// const getSputnikMissions = async () => {
//   try {
//     const body = new URLSearchParams({
//       keyword: "landsat",
//     });

//     const response = await axios.post(
//       "https://cmr.earthdata.nasa.gov/search/collections.json",
//       body.toString(),
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       },
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// const getGranules = async (shortName) => {
//   try {
//     const response = await axios.get(
//       "https://cmr.earthdata.nasa.gov/search/granules.json",
//       {
//         params: {
//           short_name: shortName,
//           bounding_box: "-74.3,40.4,-73.6,41.0",
//           page_size: 10,
//         },
//       },
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// const loadData = async () => {
//   const missions = await getSputnikMissions();
//   const shortName = missions.feed.entry[0].short_name;
//   const granules = await getGranules(shortName);
//   console.log(granules);
// };

// loadData();

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
  const cardImg = document.querySelector(".card-img-top");
  const cardTitle = document.querySelector(".card-title");
  const cardCloud = document.getElementById("cloud");
  const cardDateTime = document.getElementById("dateTime");

  cardImg.src = element.assets?.thumbnail?.href;
  cardDateTime.textContent = formatDateToCTAC(element.properties.datetime);
  cardCloud.textContent = element.properties["eo:cloud_cover"];
  cardTitle.textContent = element.properties.platform;
};

getSputnikPics();
