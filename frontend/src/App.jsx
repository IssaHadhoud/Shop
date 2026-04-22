import Product from "./component/Product";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import CreateProduct from "./component/CreateProduct";
import Login from "./component/Login";
import Register from "./component/Register";
import Cart from "./component/Cart";
import User from "./component/User";
import CreateCategory from "./component/CreateCategory";
import Details from "./component/Details";
import EditProfile from "./component/EditProfile";
import MyOrder from "./component/MyOrder";
import UpdateProduct from "./component/UpdateProduct";
import Orders from "./component/Orders";
import SingleOrder from "./component/SingleOrder";
import Category from "./component/Category";
import EditCategory from "./component/EditCategory";
import BlockScreen from "./component/BlockScreen";

const App = () => {

  return (
    <div>
      <Routes>
        ( let token = localStorage.getItem("token"); console.log(token) )
        <Route path="/" element={<Product />}></Route>
        <Route path="/category/:id" element={<Product />}></Route>
        <Route path="/product/:id" element={<Details />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/create" element={<CreateProduct />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<User />}></Route>
        <Route path="/category" element={<Category />}></Route>
        <Route path="/category/create" element={<CreateCategory />}></Route>
        <Route path="/category/edit/:id" element={<EditCategory />}>
          {" "}
        </Route>
        <Route path="/profile/:id" element={<EditProfile />}></Route>
        <Route path="/order/myOrder" element={<MyOrder />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/order/:id" element={<SingleOrder />}></Route>
        <Route path="/product/edit/:id" element={<UpdateProduct />}></Route>
      </Routes>
    </div>
  );
};

export default App;
