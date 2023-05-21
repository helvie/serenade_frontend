import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    email: null,
    password: null,
    gender: null,
    sexuality: null,
    relationshipStatus: null,
    name: null,
    imaginaryName: null,
    birthdate: null,
    location: { city: null, longitude: null, latitude: null },
    pictures: [],
  },
  token: null,
};

export const UserSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addSubscriptionToStore: (state, action) => {
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    addGenderToStore: (state, action) => {
      state.value.gender = action.payload;
    },
    addSexualityToStore: (state, action) => {
      state.value.sexuality = action.payload;
    },
    addRelationshipStatusToStore: (state, action) => {
      state.value.relationshipStatus = action.payload;
    },
    addUserInfosToStore: (state, action) => {
      state.value.name = action.payload.name;
      state.value.imaginaryName = action.payload.imaginaryName;
      state.value.birthdate = action.payload.birthdate;
      state.value.location.city = action.payload.location.city;
      state.value.location.longitude = action.payload.location.longitude;
      state.value.location.latitude = action.payload.location.latitude;
    },
    addPicturesToStore: (state, action) => {
      state.value.pictures = action.payload;
    },
    addTokenToStore: (state, action) => {
      state.token = action.payload;
    },
    clearStore: (state) => {
      state.value = initialState.value;
    },
  },
});

export const {
  addSubscriptionToStore,
  addGenderToStore,
  addPicturesToStore,
  addRelationshipStatusToStore,
  addSexualityToStore,
  addUserInfosToStore,
  addTokenToStore,
  clearStore,
} = UserSlice.actions;
export default UserSlice.reducer;
