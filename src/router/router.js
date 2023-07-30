import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Signup from '../pages/signup/signup'
import FavouritesMovies from "../pages/Favoutites/FavouritesMovies";
import Profile from "../pages/profile/profile";
import ProtectedRoute from "./protectedRoutes";
import FavouritesSeries from "../pages/Favoutites/FavouriteSeries";

export default function AppRouting() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/favourite-movies" component={FavouritesMovies} />
        <ProtectedRoute path="/favourite-series" component={FavouritesSeries} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
}
