import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  photos: [],
  isLoading: false,
  pages: 1,
};

export const getPhotos = createAsyncThunk("photos/getPhotos", async (page) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=18`
  );
  const formattedResponse = await response.json();
  return formattedResponse;
});

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    increment: (state) => {
      state.pages += 1;
      state.isLoading = true;
    },
    decrement: (state) => {
      state.pages <= 1 ? (state.pages = 1) : (state.pages -= 1);
      state.isLoading = true;
    },
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.isLoading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      state.isLoading = false;
    },
    [getPhotos.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { increment, decrement } = gallerySlice.actions;
export const getPhotosBasedOnPages = () => (dispatch, getState) => {
  const { pages } = getState().gallery;
  dispatch(getPhotos(pages));
};
export default gallerySlice.reducer;
