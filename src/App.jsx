import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home1 from "./component/Home1";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Verifyotp from "./pages/Verifyotp";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Orders1 from "./pages/Orders1";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> 

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                
                <Route path="/verify-otp" element={<Verifyotp />} />

                <Route path="/novels" element={<Home1 />} />

                <Route path="/cart" element={<Cart />} />

                 <Route path="/checkout" element={<Checkout />} />

                  <Route path="/Myorders" element={<Orders />} />

                  <Route path="/orders" element={<Orders1 />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;