import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  rawData: [],
  albumsData: [],
  isLoading: false,
  searchQuery: "",
  categories: {},
  selectedCategory: "All",
  selectedReleaseDate: undefined,
};

//parse API data into simple object
const getParsedData = (entries) => {
  const data = [];
  if(entries.length) {
    entries.forEach(entry => {
      let item = {
        id: entry['id']['attributes']['im:id'],
        url: entry['im:image'][2]['label'],
        name: entry['im:name']['label'],
        category: entry['category']['attributes']['label'],
        artist: entry['im:artist']['label'],
        releaseDate: entry['im:releaseDate']['label'],
        isFavorite: false,
      }
      data.push(item);
    });
  }
  return data;
}

//get catergories from data
const getCategories = (entries) => {
  const categories = {
    "All": "All"
  };
  if(entries.length) {
    entries.forEach(entry => {
      const category = entry['category']['attributes']['label'];
      if(!categories[category]) {
        categories[category] = category;
      }
    });
  }
  return categories;
}

//Fetch data from API
export const fetchList = createAsyncThunk(
  'listing/fetchList',
  async () => {
    return fetch("https://itunes.apple.com/us/rss/topalbums/limit=100/json").then((res) => res.json());
  }
);

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    searchAlbums: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setReleaseDate: (state, action) => {
      const d = action.payload
      state.selectedReleaseDate = d ? action.payload : undefined;
    },
    updateFavorite: (state, action) => {
      const data = state.albumsData;
      const payload = action.payload;
      state.albumsData = data.map(item => {
        if(payload.id == item.id) {
          item.isFavorite = payload.isFavorite;
        }
        return item;
      })
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.isLoading = false;
        if(action.payload && action.payload.feed && action.payload.feed.entry) {
        state.rawData = action.payload.feed.entry;
        state.categories = getCategories(action.payload.feed.entry);  
        state.albumsData = getParsedData(action.payload.feed.entry, state.albumsData);
        }
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { searchAlbums, updateFavorite, setCategory, setReleaseDate } = listingSlice.actions;

export const selectData = (state) => state.listing.albumsData;
export const selectState = (state) => state.listing;

export default listingSlice.reducer;
