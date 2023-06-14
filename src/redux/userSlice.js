import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currentUser } from "../functions/auth";

const initialState = {
  email: "",
  phone: "",
  token: "",
  companyName: "",
  tagLine: "",
  bio: "",
  uid: "",
  website: "",
  instagramUrl: "",
  linkedinUrl: "",
  location: "",
  firstName: "",
  lastName: "",
  name: "",
  role: "",
  DOB: "",
  uid: "",
  state: "",
  city: "",
  categories: [],
  budget: {
    min: 0,
    max: 0,
  },
  profilePicture: {
    reference: "",
    url: "",
    isDefault: true,
  },
  age: "",
  barter: false,
  tnc: false,
  _id: "",
  userProfile: {},
  wishlist: [],
  notification: [],
  newNotification: false,
  credits: 0,
  accountType: "basic",
  gender: "",
  testUsername: "",
  isLoading: true,
};

// calling user data ayncronus way
export const getAsyncUser = createAsyncThunk(
  "user/getAsyncUser",
  async (authtoken, thunkAPI) => {
    // console.log("token", authtoken);
    try {
      const resp = await currentUser(authtoken);
      // console.log(, "usersl8ice");
      const user = resp.data.user;
      console.log(user.credits, "userSlice");
      let data = {
        email: user.email,
        token: authtoken,
        _id: user._id,
        phone: user.phone,
        DOB: "",
        role: user.role,
        categories: user?.categories,
        uid: user.uid,
        name: user.firstName,
        companyName: user.firstName,
        bio: user.about,
        city: user.city,
        state: user.state,
        credits: user.credits,
        tagLine: user.userProfile.tagLine,
        website: user.userProfile.websiteUrl,
        profilePicture: {
          reference: user?.profilePicture?.reference,
          url: user?.profilePicture?.url,
        },

        isLoading: false,
      };
      let idata = {
        email: user.email,
        age: user.userProfile.age,
        token: authtoken,
        _id: user._id,
        phone: user.phone,
        DOB: user.DOB,
        role: user.role,
        city: user.city,
        state: user.state,
        categories: user?.categories,
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        name: `${user.firstName} ${user.lastName}`,
        bio: user.about,
        gender: user.userProfile.gender,
        budget: user.userProfile.budget,
        barter: user.userProfile.barterAvailability,
        credits: user.credits,
        profilePicture: {
          reference: user?.profilePicture?.reference,
          url: user?.profilePicture?.url,
        },
        userProfile: user.userProfile,
        testUsername: user?.testUsername,
        isLoading: false,
      };

      return user?.role === "brand" ? data : idata;
    } catch {
      return thunkAPI.rejectWithValue("something wait wrong");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    noUser: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state = initialState;
    },
    setDOB: (state, { payload }) => {
      state.DOB = payload.DOB;
    },
    setTestUsername: (state, { payload }) => {
      state.testUsername = payload.testUsername;
    },
    setGender: (state, { payload }) => {
      state.gender = payload.gender;
    },
    setBudget: (state, { payload }) => {
      state.budget = payload.budget;
    },
    setState: (state, { payload }) => {
      state.state = payload.state;
    },
    setCity: (state, { payload }) => {
      state.city = payload.city;
    },
    setFirstName: (state, { payload }) => {
      state.firstName = payload.firstName;
    },
    setLastName: (state, { payload }) => {
      state.lastName = payload.lastName;
    },
    setBio: (state, { payload }) => {
      state.bio = payload.bio;
    },
    setNewNotification: (state, { payload }) => {
      state.newNotification = payload.newNotification;
    },
    setBookmark: (state, { payload }) => {
      state.wishlist = payload.wishlist;
    },
    setBarter: (state, { payload }) => {
      state.barter = payload.barterAvailability;
    },
    setNotifications: (state, { payload }) => {
      state.notification = payload.notification;
    },
    setProfilePicture: (state, { payload }) => {
      state.profilePicture.reference = payload.reference;
      state.profilePicture.url = payload.url;
    },
    setCategories: (state, { payload }) => {
      state.categories = payload.categories;
    },
    brandLogin: (state, { payload }) => {
      (state._id = payload._id),
        (state.email = payload.email),
        (state.token = payload.token),
        (state.phone = payload.phone),
        (state.companyName = payload.companyName),
        (state.tagLine = payload.tagLine),
        (state.location = payload.location),
        (state.city = payload.city),
        (state.state = payload.state),
        (state.linkedinUrl = payload.linkedinUrl),
        (state.website = payload.website),
        (state.instagramUrl = payload.instagramUrl),
        (state.bio = payload.bio),
        (state.name = payload.companyName),
        (state.role = payload.role),
        (state.uid = payload.uid),
        (state.tnc = payload.tnc),
        (state.profilePicture.url = payload.profilePicture.url),
        (state.profilePicture.reference = payload.profilePicture.reference),
        (state.isLoading = false);
    },
    login: (state, { payload }) => {
      if (payload.role === "brand") {
        (state._id = payload._id),
          (state.email = payload.email),
          (state.token = payload.token),
          (state.phone = payload.phone),
          (state.DOB = payload.DOB),
          (state.age = payload.age),
          (state.barter = payload.barter),
          (state.companyName = payload.companyName),
          (state.tagLine = payload.tagLine),
          (state.location = payload.location),
          (state.city = payload.city),
          (state.budget.min = payload.budget?.min),
          (state.budget.max = payload.budget?.max),
          (state.state = payload.state),
          (state.linkedinUrl = payload.linkedinUrl),
          (state.website = payload.website),
          (state.instagramUrl = payload.instagramUrl),
          (state.bio = payload.bio),
          (state.firstName = payload.firstName),
          (state.lastName = payload.lastName),
          (state.name = payload.firstName + " " + payload.lastName),
          (state.role = payload.role),
          (state.uid = payload.uid),
          (state.categories = payload.categories),
          (state.tnc = payload.tnc),
          (state.profilePicture.url = payload.profilePicture.url),
          (state.profilePicture.isDefault = payload.profilePicture.isDefault),
          (state.profilePicture.reference = payload.profilePicture.reference);
        state.isLoading = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncUser.pending, (state) => {
        // console.log('pending'),
        (state._id = ""),
          (state.email = ""),
          (state.phone = ""),
          (state.DOB = ""),
          (state.name = ""),
          (state.role = ""),
          (state.uid = ""),
          (state.isLoading = true);
      })
      .addCase(getAsyncUser.fulfilled, (state, { payload }) => {
        (state._id = payload._id),
          (state.email = payload.email),
          (state.token = payload.token),
          (state.phone = payload.phone),
          (state.DOB = payload.DOB),
          (state.userProfile = payload.userProfile),
          (state.age = payload.age),
          (state.barter = payload.barter),
          (state.companyName = payload.companyName),
          (state.tagLine = payload.tagLine),
          (state.location = payload.location),
          (state.gender = payload.gender),
          (state.city = payload.city),
          (state.budget.min = payload.budget?.min),
          (state.budget.max = payload.budget?.max),
          (state.state = payload.state),
          (state.credits = payload.credits),
          (state.linkedinUrl = payload.linkedinUrl),
          (state.website = payload.website),
          (state.instagramUrl = payload.instagramUrl),
          (state.bio = payload.bio),
          (state.firstName = payload.firstName),
          (state.lastName = payload.lastName),
          (state.name = payload.firstName + " " + payload.lastName),
          (state.role = payload.role),
          (state.uid = payload.uid),
          (state.categories = payload.categories),
          (state.testUsername = payload.testUsername),
          (state.tnc = payload.tnc),
          (state.profilePicture.url = payload.profilePicture.url),
          (state.profilePicture.isDefault = payload.profilePicture.isDefault),
          (state.profilePicture.reference = payload.profilePicture.reference);
        state.isLoading = false;
      })
      .addCase(getAsyncUser.rejected, (state) => {
        // console.log('error'),
        (state._id = ""),
          (state.email = ""),
          (state.phone = ""),
          (state.DOB = ""),
          (state.name = ""),
          (state.role = ""),
          (state.uid = ""),
          (state.isLoading = false);
      });
  },
});

export const {
  login,
  logout,
  setFirstName,
  setLastName,
  setBio,
  noUser,
  brandLogin,
  setBookmark,
  setProfilePicture,
  setDOB,
  setGender,
  setBudget,
  setBarter,
  setTestUsername,
  setCategories,
  setNewNotification,
  setNotifications,
  setCity,
  setState,
} = userSlice.actions;

export default userSlice.reducer;
