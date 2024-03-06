import "./App.css";
import { Routes, Route, Link} from "react-router-dom";
import HomePage from "./Layout/layout";
import { BasketPage } from "./pages/basket/basket";


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="basket" element={<BasketPage/>} />
    </Routes>
    </>
  );
}

export default App;
