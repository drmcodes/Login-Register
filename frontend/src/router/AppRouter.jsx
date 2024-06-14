import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, Root, Dashboard } from "../pages";
import Protected from "./Protected";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
