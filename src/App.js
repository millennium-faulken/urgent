import "./App.css";
import Urgent from "./Urgent";
import { AuthProvider } from "./auth/Auth";

function App() {
  return (
    <div className="App">
      <AuthProvider >
        <Urgent />
      </AuthProvider>
    </div>
  );
}

export default App;
