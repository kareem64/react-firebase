import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.post(
      "http://localhost:4000/api/products/products"
    );
    if (response.data.success) {
      return response.data.products;
    } else {
      toast.error(response.data.message);
    }
  }
);

//Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ formData, toast, navigate }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/addproduct",
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
        return response.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
//delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({id,toast,reloadPage}) => {
    const response = await axios.delete(
      "http://localhost:4000/api/products/deleteproduct/"+id
    );
    if (response.data.success) {
      toast.success(response.data.message);
      reloadPage()
    } else {
      toast.error(response.data.message);
    }
  }
);
const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers:(builder)=>{
    builder
     .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
     .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  }
});

export default productsSlice.reducer;
