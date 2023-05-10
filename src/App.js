import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dash';
import { CreateItem } from "./pages/createitem";
import { EditItem } from './pages/edit-item';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/create" element={<CreateItem />} />
          <Route path="/edit" element={<EditItem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
