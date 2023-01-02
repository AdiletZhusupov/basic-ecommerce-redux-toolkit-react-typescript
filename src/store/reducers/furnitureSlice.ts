import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IFurnitureItem } from "../../types/types";
import axios from "axios";

// API endpoints for all products and a single product
const endpointAllFurnitureItems =
  "https://course-api.com/javascript-store-products";
const endpointSingleFurnitureItem =
  "https://course-api.com/javascript-store-single-product?id=";

interface IInitialState {
  isLoading: boolean;
  error: string;
  furnitureItems: IFurnitureItem[];
  furnitureItemsToDisplay: IFurnitureItem[];
  companies: string[];
  singleFurniture: IFurnitureItem | null;
}

const initialState: IInitialState = {
  isLoading: false,
  error: "",
  furnitureItems: [],
  furnitureItemsToDisplay: [],
  companies: [],
  singleFurniture: null
};

// API call functions
export const fetchFurnitureItems = createAsyncThunk(
  "furnitureItems/fetchAll",
  async (_, ThunkAPI) => {
    try {
      const resp = await axios.get<IFurnitureItem[]>(endpointAllFurnitureItems);
      return resp.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

export const fetchSingleFurnitureItem = createAsyncThunk(
  "singleFurnitureItem/fetchOne",
  async (furnitureItemId: string, ThunkAPI) => {
    try {
      const resp = await axios.get<IFurnitureItem>(
        `${endpointSingleFurnitureItem}${furnitureItemId}`
      );
      return resp.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong!");
    }
  }
);

const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    filterByCompany: (state, action: PayloadAction<string>) => {
      if (action.payload === "All") {
        state.furnitureItemsToDisplay = state.furnitureItems;
      } else {
        state.furnitureItemsToDisplay = state.furnitureItems.filter(
          (furnitureItem) => {
            return (
              furnitureItem.fields.company.toLowerCase() ===
              action.payload.toLowerCase()
            );
          }
        );
      }
    },
    filterByName: (state, action: PayloadAction<string>) => {
      if (action.payload === "") {
        state.furnitureItemsToDisplay = state.furnitureItems;
      } else {
        state.furnitureItemsToDisplay = state.furnitureItems.filter(
          (furnitureItem) => {
            return furnitureItem.fields.name
              .toLowerCase()
              .includes(action.payload.toLowerCase());
          }
        );
      }
    }
  },
  extraReducers: (build) => {
    build.addCase(fetchFurnitureItems.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      fetchFurnitureItems.fulfilled,
      (state, action: PayloadAction<IFurnitureItem[]>) => {
        state.isLoading = false;
        state.furnitureItems = action.payload;
        state.furnitureItemsToDisplay = action.payload;
        const companyNames = action.payload.map((companyInfo) => {
          return companyInfo.fields.company;
        });
        const uniqueCompanies = Array.from(new Set(companyNames));
        const uniqueCompaniesWithAll = ["All", ...uniqueCompanies];
        state.companies = uniqueCompaniesWithAll;
      }
    );
    build.addCase(
      fetchFurnitureItems.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    build.addCase(fetchSingleFurnitureItem.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      fetchSingleFurnitureItem.fulfilled,
      (state, action: PayloadAction<IFurnitureItem>) => {
        state.isLoading = false;
        state.singleFurniture = action.payload;
      }
    );
    build.addCase(
      fetchSingleFurnitureItem.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  }
});

export default furnitureSlice.reducer;
export const { filterByCompany, filterByName } = furnitureSlice.actions;
