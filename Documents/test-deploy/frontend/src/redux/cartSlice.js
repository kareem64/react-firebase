import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const getCart = createAsyncThunk(
  "cart/getCart",
  async ({ token, toast }) => {
    try {
      const response = await axios.post(
        "https://vercel-test-five-peach.vercel.app/api/cart/getcart",
        {},
        {
          headers: { token: token },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Server Error");
    }
  }
);

//القيمة المبدئية
const initialState = {
  items: [],
  //جلب التوكن من الlocal storage
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  isLoading: false,
  error: null,
  userName: "",
  admin: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //تحقق من التوكن من الlocal storage
      if (state.token) {
        //جلب المنتج من ال payload
        const product = action.payload;
        //التحقق من مطابقة المنتج اللى جاى من الباى لوود للمنتج الموجود فى السلة عن طريق ال ID
        const existingItem = state.items.find((i) => i.id === product.id);
        //اذا كان موجود فى السلة هنزود الكمية ١
        if (existingItem) {
          existingItem.quantity++;
        } else {
          //اذا لم يوجد العنصر فى السلة يتم اضافة عنصر جديد
          state.items.push({ ...product, quantity: 1 });
        }
        //ارسال اى دى المنتج والتوكن للباك اند
        axios
          .post(
            "https://vercel-test-five-peach.vercel.app/api/cart/addtocart",
            { productId: product._id },
            { headers: { token: state.token } }
          )
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
            } else {
              toast.error(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        toast.error("Please Login to Add to Cart");
      }
    },

    removeFromCart: (state, action) => {
      //تحقق من التوكن من الlocal storage
      // الباى لوود هو اللى جاى من زر الريموف

      const productId = action.payload._id;

      //التحقق من مطابقة المنتج اللى جاى من الباى لوود للمنتج الموجود فى السلة عن طريق ال ID
      //اذا كان موجود فى السلة يتم ازالة العنصر والتحذير عن الزيادة على الكمية

      state.items = state.items.filter((item) => item.id !== productId);
      //اذا كان الكمية الحالية تساوى٠ يتم ازالة المنتج من السلة

      //ارسال اى دى المنتج والتوكن للباك اند
      axios
        .post(
          "https://vercel-test-five-peach.vercel.app/api/cart/removefromcart",
          { productId: productId },
          { headers: { token: state.token } }
        )
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;

        state.items = action.payload.cart;

        state.userName = action.payload.user.name;

        state.admin = action.payload.admin;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
