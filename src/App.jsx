import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";

import EncodePage from "./pages/Encode";
import DecodePage from "./pages/Decode";
import HackPage from "./pages/Hack";

import "./assets/header.scss";
import "./assets/popup.scss";
import "./assets/page.scss";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/encode' element={<EncodePage />} />
        <Route path='/decode' element={<DecodePage />} />
        <Route path='/hack' element={<HackPage />} />

        <Route path='*' element={<Navigate to='/encode' />} />
      </Routes>
    </Router>
  );
}

export default App;
