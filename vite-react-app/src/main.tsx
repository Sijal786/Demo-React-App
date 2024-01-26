import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import MainPage from "./components/MainPage.tsx";
import Login from "./components/authentication/Login.tsx";
import SignUp from "./components/authentication/Signup.tsx";
import Register from "./components/registration/Register.tsx";
import App from "./App.tsx";
import { Routes } from "./shared/routes/Routes.tsx";
import  { ProductProvider } from "./components/context/ProductContext.tsx";

const router = createBrowserRouter([
  {
    path: Routes.Home,
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.Login,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.SignUp,
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.MainPage,
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.Register,
    element: <Register />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </React.StrictMode>
);
