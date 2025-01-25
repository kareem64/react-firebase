import Header from "./componnent/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { useEffect} from "react";
import { googleLogout } from "@react-oauth/google";
import "./App.css";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productSlice";
import { toast } from "react-toastify";
import { getCart } from "./redux/cartSlice";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Success from "./componnent/Success";
import Cancel from "./componnent/Cancel";
import CashDelivery from "./pages/CashDelivery";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
function App() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { userName, items, admin, token } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  //get totalPrice
  const totalPrice = items.reduce((acc, item) => {
    const product = products.find((product) => product._id === item._id);
    if (product) {
      acc += product.price * item.quantity;
    } else {
      console.log("Product not found");
    }
    return acc;
  }, 0);

  //get total count
  const getTotalcount = () => {
    let totalcount = 0;
    items.forEach((item) => {
      totalcount += item.quantity;
    });
    return totalcount;
  };

  useEffect(() => {
    dispatch(fetchProducts(toast));
    dispatch(getCart({ token, toast }));
  }, [items,dispatch,token]);

  return (
    <div className="App">
      <Header
        googleLogout={googleLogout}
        token={token}
        toast={toast}
        admin={admin}
        getTotalcount={getTotalcount}
        userName={userName}
      />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/register" element={<Register token={token} />} />
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              items={items}
              token={token}
              toast={toast}
              totalPrice={totalPrice}
              dispatch={dispatch}
              getCart={getCart}
            />
          }
        />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="/placeorder" element={<PlaceOrder   totalPrice={totalPrice} items={items} token={token}  products={products}  toast={toast} navigate={navigate}/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
        <Route path="/cashDelivery" element={<CashDelivery token={token}/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/createproduct" element={<CreateProduct />} />


        <Route
          path="*"
          element={<div className="not-found">Page Not Found !!</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
