import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./component/Home";
import Home1 from "./component/Home1";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Verifyotp from "./pages/Verifyotp";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Orders1 from "./pages/Orders1";
import NotFound from "./pages/NotFound";

import Admin from "./pages/Admin";
import Adminl from "./pages/Adminl";
import Adminorders from "./pages/Adminorders";
import Manageusers from "./pages/Manageusers";
import Managebooks from "./pages/Managebooks";
import Addbook from "./pages/Addbook";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* ================= USER SIDE ================= */}

                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Home />
                        </>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <>
                            <Navbar />
                            <Login />
                        </>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <>
                            <Navbar />
                            <Register />
                        </>
                    }
                />

                <Route
                    path="/verify-otp"
                    element={
                        <>
                            <Navbar />
                            <Verifyotp />
                        </>
                    }
                />

                <Route
                    path="/novels"
                    element={
                        <>
                            <Navbar />
                            <Home1 />
                        </>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <>
                            <Navbar />
                            <Cart />
                        </>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <>
                            <Navbar />
                            <Checkout />
                        </>
                    }
                />

                <Route
                    path="/Myorders"
                    element={
                        <>
                            <Navbar />
                            <Orders />
                        </>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <>
                            <Navbar />
                            <Orders1 />
                        </>
                    }
                />


                {/* ================= ADMIN SIDE ================= */}

                <Route
                    path="/admin"
                    element={<Adminl />}
                >

                    <Route
                        index
                        element={<Admin />}
                    />
                      <Route
                        path="orders"
                        element={<Adminorders />}
                    />

                       <Route
                        path="users"
                        element={<Manageusers />}
                    />
                    <Route
                        path="books"
                        element={<Managebooks />}
                    />

                     <Route
                        path="saveb"
                        element={<Addbook />}
                    />

                    {/* <Route  
                      path="orders/:orderId"
                      element={<AdminOrderDetails />}
                     /> */}

                </Route>


                {/* ================= 404 ================= */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;

