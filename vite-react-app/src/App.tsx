import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage.tsx";
import Login from "./components/authentication/Login.tsx";
import SignUp from "./components/authentication/Signup.tsx";
import Registration from "./components/subscription/Registration.tsx";
import { Routes } from "./shared/routes/Routes.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import Checkout from "./components/subscription/Checkout.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import UpdateSubscription from "./components/subscription/UpdateSubscription.tsx";
import ShowAllSubscriptions from "./components/subscription/ShowAllSubscriptions.tsx";
import MainPage from "./components/MainPage";
import SearchProvider from "./components/context/SearchContext";
import { useFetchProducts } from "./services/hooks/useFetchProducts";
import { createContext } from "react";
import Loading from "./shared/components/Loading";
import ShowErrorDialog from "./shared/dialogs/ShowErrorDialog";

export const ProductContext = createContext<any>(undefined);

export default function App() {
  const [products, setProducts] = useState([]);
  const { isLoading, data, error, isError }: any = useFetchProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProducts(data.data.data);
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowErrorDialog error={error.message} />;
  }

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
      element: <Registration />,
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
    {
      path: Routes.UpdateSubscription,
      element: <UpdateSubscription />,
      errorElement: <ErrorPage />,
    },
    {
      path: Routes.ShowAllSubscriptions,
      element: <ShowAllSubscriptions />,
      errorElement: <ErrorPage />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ProductContext.Provider value={products}>
        <SearchProvider>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <MainPage
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </SearchProvider>
      </ProductContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
