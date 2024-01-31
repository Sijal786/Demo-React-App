import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import { getAPIResult } from "../services/axios";
import PricingComponent from "./subscription/PricingComponent";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  console.log(product);
  const productId = product.id;
  console.log(productId);

  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const priceUrl = `https://api.stripe.com/v1/prices?product=${productId}`;
        const pricingData = await getAPIResult(priceUrl);
        setPricing(pricingData);
        console.log("Pricing Data", pricing);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      }
    };

    fetchPricing();
  }, [productId]);

  console.log("======Pricing", pricing);

  
  const defaultTheme = createTheme();

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          marginTop: "70px",
        }}
      >
        <Typography variant="h2" align="center" fontWeight={100}>
          {product.name}
        </Typography>
        <Typography variant="h4" align="center" mt={4}>
          Swift & precise calculations, complete contract lifecycle coverage,
          multiple calculation types{" "}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          mt={3}
          fontSize={22}
          align="center"
          color="text.secondary"
        >
          {product.description}
        </Typography>
        <img src={product.images[0]} alt="This is my image" />
      </Container>
      
      <PricingComponent pricing={pricing} />
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
      </ThemeProvider>
    </>
  );
};

export default ProductDetails;
