import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campaignName: "",
  campaignPeriod: {
    startDate: "",
    endDate: "",
  },
  campaignPlatform: {
    platformName: "",
    platformLogo: "",
  },
  deliverable: [],
  dos: [
    "The product shall be the main focus",
    "Use complimenting colours",
    "Follow the guidelines",
    "Submit the campaign content on time",
    "The image should be visually appealing",
    "Mention the caption in the chat which you will be using while posting the image",
    "Make sure the content is high quality, well lit and not heavily edited",
  ],
  donts: [
    "Any sort of nuidity and profanity shall not be entertained",
    "Do not post without approval",
    "Do not share product images available publicly on the internet",
  ],
  categories: [],
  age: {
    min: 0,
    max: 0,
  },
  gender: "",
  barter: false,
  influencerBudget: {
    min: 0,
    max: 0,
  },
  requiredInfluencers: 0,
  followersRange: {
    min: 0,
    max: 0,
  },
  campaignBanner: "",
  referenceImage: [],
  // referenceVideoExampleLink: [],
  // serviceMedia: {
  //   image: "",
  //   name: "",
  //   price: 0,
  // },
  brandUserId: "",
  credits: 1000,
};

// calling authToken data ayncronus way

const CreateCampaignSlice = createSlice({
  name: "authToken",
  initialState: initialState,
  reducers: {
    setCampaignInfo: (state, { payload }) => {
      state.campaignPlatform.platformLogo = payload.platformLogo;
      state.campaignPlatform.platformName = payload.platformName;
    },
    setCampaignBanner: (state, { payload }) => {
      state.campaignBanner = payload.campaignBanner;
    },
    setBrandUserId: (state, { payload }) => {
      state.brandUserId = payload.brandUserId;
    },
    setServiceName: (state, { payload }) => {
      state.serviceMedia.name = payload.name;
    },
    setReferenceImage: (state, { payload }) => {
      state.referenceImage = payload.referenceImage;
    },
    setServiceImage: (state, { payload }) => {
      state.serviceMedia.image = payload.image;
    },
    setServicePrice: (state, { payload }) => {
      state.serviceMedia.price = payload.price;
    },
    setCampaignName: (state, { payload }) => {
      state.campaignName = payload.campaignName;
    },
    setStartDate: (state, { payload }) => {
      state.campaignPeriod.startDate = payload.startDate;
    },
    setEndDate: (state, { payload }) => {
      state.campaignPeriod.endDate = payload.endDate;
    },
    setDeliverable: (state, { payload }) => {
      state.deliverable = payload.deliverable;
    },
    setDos: (state, { payload }) => {
      state.dos = payload.dos;
    },
    setDonts: (state, { payload }) => {
      state.donts = payload.donts;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    setAgeFrom: (state, { payload }) => {
      state.age.min = payload.min;
    },
    setAgeTo: (state, { payload }) => {
      state.age.max = payload.max;
    },
    setBarter: (state, { payload }) => {
      state.barter = payload.barter;
    },
    setRequiredInfluencers: (state, { payload }) => {
      state.requiredInfluencers = payload.requiredInfluencers;
    },
    setFollowersRangeMin: (state, { payload }) => {
      state.followersRange.min = payload.min;
    },
    setFollowersRangeMax: (state, { payload }) => {
      state.followersRange.max = payload.max;
    },
    setGender: (state, { payload }) => {
      state.gender = payload.gender;
    },
  },
});

export const {
  setCampaignName,
  setDeliverable,
  setDos,
  setAgeFrom,
  setAgeTo,
  setCategories,
  setGender,
  setCampaignInfo,
  setRequiredInfluencers,
  setFollowersRangeMax,
  setFollowersRangeMin,
  setDonts,
  setBarter,
  setEndDate,
  setStartDate,
  setReferenceImage,
  setServiceImage,
  setBrandUserId,
  setServiceName,
  setServicePrice,
  setCampaignBanner,
} = CreateCampaignSlice.actions;

export default CreateCampaignSlice.reducer;
