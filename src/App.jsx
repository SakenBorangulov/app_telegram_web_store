import { useEffect } from "react";
import "./app.css";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/productList/ProductList";
import Form from "./components/form/Form";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />}/>
        <Route path="/form" element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
