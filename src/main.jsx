import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import BookDetail from "./pages/BookDetail";
import { BookProvider } from "./context/BookContext";
import "./index.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);
