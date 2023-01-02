import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/main/MainPage";
import { ProductItem } from "./components/singleProduct/ProductItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:id" element={<ProductItem />} />
    </Routes>
  );
}
