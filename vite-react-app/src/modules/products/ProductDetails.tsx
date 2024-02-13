import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocation } from "react-router-dom";
import PricingComponent from "../pricing/PricingComponent";
import { useFetchProductById } from "../../services/hooks/useFetchProductById";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";

const ProductDetails = () => {
  const location = useLocation();
  const productId = location.state?.product.id;
  console.log("Product id in Product Deatils Page", productId);

  const [product, setProduct] = useState<any>({});
  const { isLoading, data, error, isError }: any =
    useFetchProductById(productId);
  console.log(data?.data);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProduct(data.data);
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    <Loading />;
  }
  if (isError) {
    return <ShowErrorDialog error={error.message} />;
  }

  console.log("Query Result of Product By id", product);

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
          {product?.name}
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
          {product?.description}
        </Typography>
        {product?.images ? (
          <img src={product.images[0]} alt="Product" />
        ) : (
          <p>Loading image...</p>
        )}
      </Container>
      <PricingComponent productId={productId} product={product} />
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
