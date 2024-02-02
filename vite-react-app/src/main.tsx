import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import MainPage from "./components/MainPage.tsx";
import Login from "./components/authentication/Login.tsx";
import SignUp from "./components/authentication/Signup.tsx";
import RegisterCustomers from "./components/subscription/RegisterCustomet.tsx";
import App from "./App.tsx";
import { Routes } from "./shared/routes/Routes.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import { CartProvider } from "./components/context/CartContext.tsx";
import Checkout from "./components/subscription/Checkout.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'


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
    element: <RegisterCustomers />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.ProductDetails,
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: Routes.Checkout,
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen = {false} position = 'bottom-right' />
      </QueryClientProvider>
   
  </React.StrictMode>
);
