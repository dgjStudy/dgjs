import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardView from "./main";
import DetailView from "./detail";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardView />} />
                    <Route path="detail/:id" element={<DetailView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
