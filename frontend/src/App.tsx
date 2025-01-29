import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import InsertProduct from "./pages/InsertProduct";
import ListProduct from "./pages/ListProduct";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/produtos" element={<InsertProduct/>}/>

        <Route path="/" element={<InsertProduct/>}/>

        <Route path="/lista-produtos" element={<ListProduct/>}/> 

      </Routes>
    </Router>
  );
};

export default App;