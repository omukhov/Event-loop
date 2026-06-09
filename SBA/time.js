import { API_KEY } from "./keys.js";

const splitDate = (date) => date.toISOString().split("T")[0];

export const getTime = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  return { endDate: splitDate(today), startDate: splitDate(weekAgo) };
};

export const getTimeForCTAC = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  return {
    startDate: weekAgo.toISOString(),
    endDate: today.toISOString(),
  };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getDate()} ${date.toLocaleDateString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
};

export const formatDateToCTAC = (dateString) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
};

export const createImageUrl = (imageData) => {
  const date = new Date(imageData.date);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/jpg/${imageData.image}.jpg?api_key=${API_KEY}`;
};
