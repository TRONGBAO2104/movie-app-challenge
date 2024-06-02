import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts import
import MainLayout from "../layouts/main/MainLayout";
import BlankLayout from "../layouts/blank/BlankLayout";
import Homepage from "../pages/home";
import NotFoundPage from "../pages/blank";
import DetailPage from "../pages/detail";
import SearchPage from "../pages/search";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path=":movieId" element={<DetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;