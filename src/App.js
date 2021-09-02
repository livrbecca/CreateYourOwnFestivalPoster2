import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginToSpotify from "./components/Login/LoginToSpotify";
import Poster from "./components/Poster/Poster";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <LoginToSpotify />} />
        <Route exact path="/yourposter" render={() => <Poster />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
