import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import uuid from "react-native-uuid";

const initialState = {
  email: "",
  phone: "",
  companyName: "",
  tagLine: "",
  bio: "",
  uuid: uuid.v4(),
  website: "https://",
  instagramUrl: "https://instagram.com/",
  linkedinUrl: "https://linkedin.com/",
  location: "",
  state: "",
  city: "",
  firstName: "",
  lastName: "",
  name: "",
  role: "",
  DOB: "",
  uid: "",
  categories: [],
  profilePicture: {
    reference: "",
    url: "",
    isDefault: true,
  },
  age: 0,
  barterAvailability: true,
  gender: "",
  budget: {
    min: 0,
    max: 0,
  },
  tnc: false,
  error: false,
  emailVerified: false,
  phoneVerified: false,
  authVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    cleanReducer: (state) => {
      state = initialState;
    },
    createUserData: (state, { payload }) => {
      (state.email = payload.email),
        (state.phone = payload.phone),
        (state.DOB = payload.DOB),
        (state.companyName = payload.companyName),
        (state.tagLine = payload.tagLine),
        (state.location = payload.location),
        (state.state = payload.state),
        (state.age =
          parseInt(moment().format("YYYY")) -
          parseInt(moment(state.DOB).format("YYYY"))),
        (state.city = payload.city),
        (state.linkedinUrl = payload.linkedinUrl),
        (state.website = payload.website),
        (state.instagramUrl = payload.instagramUrl),
        (state.bio = payload.bio),
        (state.firstName = payload.firstName),
        (state.lastName = payload.lastName),
        (state.name = payload.firstName + " " + payload.lastName),
        (state.role = payload.role),
        (state.budget = payload.budget),
        (state.uid = payload.uuid),
        (state.gender = payload.gender),
        (state.categories = payload.categories),
        (state.emailVerified = payload.emailVerified),
        (state.phoneVerified = payload.phoneVerified),
        (state.barterAvailability = payload.barterAvailability),
        (state.tnc = payload.tnc),
        (state.auth = payload.auth),
        (state.profilePicture.url = payload.profilePicture.url),
        (state.profilePicture.isDefault = payload.profilePicture.isDefault),
        (state.profilePicture.reference = payload.profilePicture.reference);
    },
    selectRole: (state, { payload }) => {
      state.role = payload.role;
    },
    setState: (state, { payload }) => {
      state.state = payload.state;
    },
    setCity: (state, { payload }) => {
      state.city = payload.city;
    },
    selectBarter: (state, { payload }) => {
      state.barterAvailability = payload.barter;
    },
    setGender: (state, { payload }) => {
      state.gender = payload.gender;
    },
    setFirstName: (state, { payload }) => {
      state.firstName = payload.firstName;
    },
    setBudget: (state, { payload }) => {
      state.budget = payload.budget;
    },
    setLastName: (state, { payload }) => {
      state.lastName = payload.lastName;
    },
    setDOB: (state, { payload }) => {
      state.DOB = payload.DOB;
      state.age =
        parseInt(moment().format("YYYY")) -
        parseInt(moment(state.DOB).format("YYYY"));
    },
    setEmail: (state, { payload }) => {
      state.email = payload.email;
    },
    setPhone: (state, { payload }) => {
      state.phone = payload.phone;
    },
    setTNC: (state, { payload }) => {
      state.tnc = payload.tnc;
    },
    setAuth: (state, { payload }) => {
      state.authVerified = payload.authVerified;
    },
    setEmailVerified: (state, { payload }) => {
      state.emailVerified = payload.emailVerified;
    },
    setPhoneVerified: (state, { payload }) => {
      state.phoneVerified = payload.phoneVerified;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    setProfilePicture: (state, { payload }) => {
      (state.profilePicture.url = payload.url),
        (state.profilePicture.isDefault = payload.isDefault),
        (state.profilePicture.reference = payload.reference);
    },
    setCompanyName: (state, { payload }) => {
      state.companyName = payload.companyName;
    },
    setTagLine: (state, { payload }) => {
      state.tagLine = payload.tagLine;
    },
    setBio: (state, { payload }) => {
      state.bio = payload.bio;
    },
    setError: (state, { payload }) => {
      state.error = payload.error;
    },
    setWebsite: (state, { payload }) => {
      state.website = payload.website;
    },
    setInstagramUrl: (state, { payload }) => {
      state.instagramUrl = payload.instagramUrl;
    },
    setLinkedinUrl: (state, { payload }) => {
      state.linkedinUrl = payload.linkedinUrl;
    },
    setLocation: (state, { payload }) => {
      state.location = payload.location;
    },
  },
});

export const {
  cleanReducer,
  createUserData,
  selectRole,
  setDOB,
  setEmail,
  setCity,
  setState,
  setPhone,
  setFirstName,
  setLastName,
  setTNC,
  setAuth,
  setEmailVerified,
  setPhoneVerified,
  setCategories,
  setBudget,
  setProfilePicture,
  setCompanyName,
  setTagLine,
  setBio,
  setError,
  setInstagramUrl,
  selectBarter,
  setLinkedinUrl,
  setLocation,
  setWebsite,
  setGender,
} = authSlice.actions;

export default authSlice.reducer;
