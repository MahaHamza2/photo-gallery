import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./GalleryState";

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});
