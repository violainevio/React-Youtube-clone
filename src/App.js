import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";

import { Route, Routes, useNavigate } from "react-router-dom";

import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";

// require("dotenv").config({ path: "../.env" });
// require("dotenv").config();

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      // navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     {/* <Layout> */}
    //     <Route path="/" element={<HomeScreen />} />
    //     {/* </Layout> */}

    //     <Route path="/auth" element={<LoginScreen />} />

    //     {/* <Layout> */}
    //     <Route path="/search" element={<h1>Search Results</h1>} />
    //     {/* </Layout> */}

    //     {/* <Route>
    //       <Redirect to="/" />
    //     </Route> */}
    //   </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout children={<HomeScreen />} />} />
      <Route path="*" element={<Layout children={<HomeScreen />} />} />
      <Route path="/auth" element={<LoginScreen />} />
      <Route
        path="/search"
        element={<Layout children={<h1>Search Results</h1>} />}
      />
      <Route
        path="/watch/:id"
        element={<Layout children={<WatchScreen />} />}
      />
    </Routes>
    // </BrowserRouter>
    // <LoginScreen />
  );
};

export default App;
