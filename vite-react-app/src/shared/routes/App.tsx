import Home from "../../modules/home/Home.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../layout/Layout.tsx";
import Products from "../../modules/products/Products.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Blogs from "../../modules/blogs/Blogs.tsx";
import Login from "../../modules/authentication/Login.tsx";
import SignUp from "../../modules/authentication/Signup.tsx";
import ROUTES from "./Routes.tsx";
import ProductDetails from "../../modules/products/ProductDetails.tsx";
import Checkout from "../../modules/checkout/Checkout.tsx";
import Protected from "./Protected.tsx";
import AddCardDialog from "../../modules/checkout/AddCardDialog.tsx";
import Profile from "../../modules/profile/Profile.tsx";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={ROUTES.Login} element={<Login />} />
            <Route path={ROUTES.SignUp} element={<SignUp />} />
            <Route path={ROUTES.Logout} element={<Blogs />} />
            <Route path={ROUTES.Products} element={<Products />} />
            <Route path={ROUTES.ProductDetails} element={<ProductDetails />} />
            <Route path={ROUTES.Profile} element={<Profile />} />
            <Route path={ROUTES.AddCardDialog} element={<AddCardDialog />} />
            <Route path={ROUTES.Blogs} element={<Blogs />} />
            <Route
              path={ROUTES.Checkout}
              element={<Protected Component={Checkout} />}
            />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
