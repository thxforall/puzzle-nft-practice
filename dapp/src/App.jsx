import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
