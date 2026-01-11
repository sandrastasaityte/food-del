import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";

import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";

import AdminLayout from "./Layout/AdminLayout";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      {/* Protected admin layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add" element={<Add />} />
        <Route path="list" element={<List />} />
        <Route path="orders" element={<Orders />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* global fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
