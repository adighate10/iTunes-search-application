import { configureStore } from '@reduxjs/toolkit';
import listingReducer from '../features/listing/listingSlice';

export const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
});
