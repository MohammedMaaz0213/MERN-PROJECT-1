import React from "react";
import { Container } from "@material-ui/core";

// import useStyles from "./styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {
  const user = localStorage.getItem("profile");
  return (
    <BrowserRouter>
      <Container maxwidth="xl">
        <Navbar />
        {/* <Auth /> */}
        <Routes>
          <Route path={"/"} exact element={<Navigate to="/posts" />} />
          <Route path={"/posts"} exact Component={Home} />
          <Route path="/posts/search" exact Component={Home} />
          <Route path="/posts/:id" exact Component={PostDetails} />

          <Route
            path={"/auth"}
            exact
            element={!user ? <Auth /> : <Navigate to="/" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
export default App;
