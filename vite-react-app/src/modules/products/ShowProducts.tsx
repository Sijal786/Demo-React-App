import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";
import { useNavigate } from "react-router-dom";
import Routes from "../../shared/routes/Routes";
import { useFetchProducts } from "../../services/hooks/useFetchProducts";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, data, error, isError }: any = useFetchProducts();
  const navigate = useNavigate();

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

  console.log("Products ", products);

  return (
    <>
      {products.map((product: any) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onClick={() =>
              navigate(`${Routes.ProductDetails.replace(":id", product.id)}`, {
                state: { product },
              })
            }
          >
            <CardMedia
              style={{ paddingTop: "56.25%" }}
              sx={{ height: "90px" }}
              image={product.images[0] || "fallback_image_url.jpg"}
              title={product.id}
            />
            <CardContent style={{ flexGrow: "1" }}>
              <Typography variant="h4">{product.name}</Typography>
              <Typography>{product.description}</Typography>
            </CardContent>
            <CardActions>
              {/* <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() =>
                  navigate(
                    `${Routes.ProductDetails.replace(":id", product.id)}`,
                    { state: { product } }
                  )
                }
              >
                Subscribe
              </Button> */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default ShowProducts;
