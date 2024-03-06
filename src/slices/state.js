import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../utils/ulr";
import { paramsGetIds } from "../utils/paramsGetIds";
import { paramsItems } from "../utils/paramsItems";
import { paramsFilter } from "../utils/paramsFilter";

export const getProductByItems = createAsyncThunk(
  "product/getProductItems",
  async (action, options) => {
    const state = options.getState();
    const { offset, limit } = state.state.pages;
    const params = paramsGetIds(offset, limit);
    const response = await fetch(URL, params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const params2 = paramsItems(data.result);
    const response2 = await fetch(URL, params2);
    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }
    const data2 = await response2.json();
    return data2.result;
  }
);

export const getProductFilter = createAsyncThunk(
  "product/getProductFilter",
  async (action) => {
    const params = paramsFilter(action);
    const response = await fetch(URL, params);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const params2 = paramsItems(data.result);
    const response2 = await fetch(URL, params2);
    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }
    const data2 = await response2.json();
    return data2.result;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    isLoading: false,
    isLoadingBasket: false,
    error: null,
    isFilter: false,
    pages: {
      offset: 0,
      limit: 50,
    },
    basket: [],
  },
  reducers: {
    setOffset: (state, action) => {
      if (state.pages.offset < 0) return (state.pages.offset = 0);
      state.pages.offset = action.payload;
    },
    setLimit: (state, action) => {
      if (state.pages.limit < 0) return (state.pages.limit = 0);
      state.pages.limit = action.payload;
    },
    setIsFilter: (state, action) => {
      state.isFilter = !state.isFilter;
    },
    setBasket: (state, action) => {
      state.basket = [...state.basket, {...action.payload}];
    },
    setBasketClear: (state, action) => {
      state.basket = [];
    },
    setLoading: (state, action) => {
      state.isLoadingBasket = !state.isLoadingBasket;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductByItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductByItems.fulfilled, (state, action) => {
        const res = action.payload.reduce((o, i) => {
          if (!o.find((v) => v.id == i.id)) {
            o.push(i);
          }
          return o;
        }, []);

        state.items = res;
        state.isLoading = false;
      })
      .addCase(getProductFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductFilter.fulfilled, (state, action) => {
        const res = action.payload.reduce((o, i) => {
          if (!o.find((v) => v.id == i.id)) {
            o.push(i);
          }
          return o;
        }, []);

        state.items = res;
        state.isLoading = false;
      });
  },
});

export const productAction = productSlice.actions;
export default productSlice.reducer;
