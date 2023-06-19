import React from "react";
import AppBarComponent from "./component/AppBarComponent";
import RestaurantsListComponent from "./component/RestaurantListComponent";
import SignupComponent from "./component/SignupComponent";
import LoginComponent from "./component/LoginComponent";
import { Container } from "@material-ui/core";
import { Routes, Route } from "react-router-dom";
import { useStyles } from "./Styles";

function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBarComponent />
      <Container maxWidth="md" className={classes.content}>
        <div className={classes.restaurantsList}>
          <Routes>
            <Route path="/" element={<RestaurantsListComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
}

export default App;
