import "./App.css";
import Urgent from "./dashboard/urgentDashboard";
import { AuthProvider } from "./auth/Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./layout/Nav";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Urgent} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
