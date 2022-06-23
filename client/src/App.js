import { Container } from "@material-ui/core";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home.js";
import NavBar from "./components/NavBar/NavBar";

const clientId = "390100289195-flj5qfqtlgik9t812s60o10q7i4fblvd.apps.googleusercontent.com";

const App = () => {
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
