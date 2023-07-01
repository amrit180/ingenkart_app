import moment from "moment/moment";
import { Dimensions, PixelRatio, Platform, ToastAndroid } from "react-native";
import { WEB_API_KEY } from "./Values";
import axios from "axios";
const { height, width, fontScale } = Dimensions.get("window");

export const REF_HEIGHT = 850.2189307543382;

export const calTime = (time) => {
  let date = new Date(time);
  let date2 = new Date(Date.now());
  const res = Math.abs(date - date2) / 1000;
  const days = Math.floor(res / 86400);
  const hours = Math.floor(res / 3600) % 24;
  if (hours >= 1 && hours < 12 && days == 0) {
    return `${hours}Hr ago`;
  } else if (hours < 1 && days == 0) {
    return moment(time).format("LT");
  } else if (hours >= 12 && days == 0) {
    return "Today";
  } else if (days >= 1 && days <= 6) {
    return `${days}D ago`;
  } else if (days >= 7 && Math.floor(days / 7) < 4) {
    return `${Math.floor(days / 7)}W ago`;
  } else if (Math.floor(days / 7) >= 4 && Math.floor(days / 7) < 52) {
    return `${Math.floor(days / 30)}M ago`;
  } else {
    return `${Math.floor(days / 365)}Y ago`;
  }
};

export const getDays = (time) => {
  let date = new Date(time);
  let date2 = new Date(Date.now());
  const res = Math.abs(date - date2) / 1000;
  const days = Math.floor(res / 86400);
  const hours = Math.floor(res / 3600) % 24;
  return days;
};

export const getDate = (time) => {
  return moment(time).format("DD/MM/YYYY");
};

export const h = (val) => {
  return val * height;
};
export const w = (val) => {
  return val * width;
};

export function fs(size) {
  // const widthBaseScale = width / 414;
  // const heightBaseScale = height / 896;
  // const newSize =
  //   based === "height" ? size * heightBaseScale : size * widthBaseScale;
  // return Math.round(PixelRatio.roundToNearestPixel(newSize));

  return size / fontScale;
}

export const nFormatter = (num) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
    : "0";
};

export const genderIdentifier = (val) => {
  const x = val.toLowerCase();
  const gender =
    x === "male"
      ? "Male"
      : x === "female"
      ? "Female"
      : x === "male & female"
      ? "Both"
      : x === "others"
      ? "Others"
      : "All";
  return gender;
};

export const textDeliverable = (v) => {
  if (v === "instaReel") return "Reels Post - ";
  if (v === "instagramPost") return "Instagram Post - ";
  if (v === "instagramStory") return "Instagram Story - ";
  if (v === "youTubeVideo") return "YouTube Video - ";
  if (v === "youtubeShorts") return "Youtube Shorts - ";
};

export const formatPhoneNumber = (text) => {
  // Remove all non-numeric characters from the input string
  const cleaned = text.replace(/\D/g, "");

  // Split the cleaned string into groups of 3 digits each
  const groups = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  // If the input string matches the expected pattern, join the groups with spaces
  if (groups) {
    return [groups[1], groups[2], groups[3]]
      .filter((group) => !!group)
      .join(" ");
  }

  // If the input string doesn't match the pattern, return the original input
  return text;
};

// program to convert first letter of a string to uppercase
export const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};
export const VideoUrlFormat = (val) => {
  const url1 = "https://www.youtube.com/watch?v=";
  const url2 = "https://youtu.be/";
  const url3 = "https://youtube.com/watch?v=";
  if (val.includes(url1)) {
    return `https://img.youtube.com/vi/${val?.split(url1)[1]}/hqdefault.jpg`;
  } else if (val.includes(url2)) {
    return `https://img.youtube.com/vi/${val?.split(url2)[1]}/hqdefault.jpg`;
  } else if (val.includes(url3)) {
    return `https://img.youtube.com/vi/${val?.split(url3)[1]}/hqdefault.jpg`;
  }
};

export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

export function getRandomInteger(min, max) {
  // Calculate the range of values
  const range = max - min + 1;
  // Generate a random value within the range and add the minimum value
  const randomValue = Math.floor(Math.random() * range) + min;
  return randomValue;
}

export const isGenderEligible = (text, newText) => {
  const textWords = text?.toLowerCase().split(/[^\w']+/);
  const newTextWords = newText?.toLowerCase().split(/[^\w']+/);

  for (let i = 0; i < newTextWords?.length; i++) {
    if (textWords.includes(newTextWords[i])) {
      return true;
    }
  }

  return false;
};

// export const isGenderEligible = (current, allowed) => {
//   console.log(current, allowed);
//   let currentGender = current?.toLowerCase();
//   let allowedGender = allowed?.toLowerCase();

//   if (currentGender === allowedGender) return true;
//   if (currentGender === "others" && allowedGender === "others") return true;
//   if (allowedGender === "both" && currentGender === "male") return true;
//   if (allowedGender === "both" && currentGender === "female") return true;
//   if (allowedGender === "male & female" && currentGender === "female")
//     return true;
//   if (allowedGender === "male & female" && currentGender === "male")
//     return true;
//   if (allowedGender === "male & female" && currentGender === "others")
//     return true;
//   return false;
// };

export const shareDeepLink = async (cimage, cname, cdesc) => {
  const payload = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://ingenkart.in/share",
      link: "https://ingenkart.com",
      androidInfo: {
        androidPackageName: "com.ingenkart",
      },
      socialMetaTagInfo: {
        socialTitle: cname,
        socialDescription: cdesc,
        socialImageLink: cimage,
      },
    },
  };
  try {
    const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${WEB_API_KEY}`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.shortLink;
  } catch (error) {
    console.log(error.response.data);
  }
};
// exp://192.168.1.6:19000?campaign/645f3eb1abe6e838f16de851
