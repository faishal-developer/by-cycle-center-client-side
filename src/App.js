import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import './App.css'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Service from "./Pages/Home/Services/Service";
import Header from "./Pages/shared/Header/Header";
import Footer from "./Pages/shared/Footer/Footer";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import AuthProvider from "./Pages/Hooks/AuthProvider";
import OneService from "./Pages/OneService/OneService";
import PrivateRoute from "./Pages/Hooks/PrivateRoute";
import CycleServices from "./Pages/Services/CycleServices";
import AboutUs from "./Pages/AboutUs/AboutUs";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/products">
            <Header />
            <Service home={false} />
            <Footer />
          </Route>
          <Route path="/services">
            <Header />
            <CycleServices />
            <Footer />
          </Route>
          <Route path="/aboutus">
            <Header />
            <AboutUs />
            <Footer />
          </Route>
          <PrivateRoute path="/products/:productsId">
            <Header />
            <OneService />
            <Footer />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
