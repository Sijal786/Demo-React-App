import { Container, Grid, Typography, Card } from "@mui/material";
import ShowPriceTable from "./ShowPriceTable";
import { useFetchProductPricing } from "../../services/hooks/useFetchPricing";
import { useState } from "react";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PricingComponent = ({ product }: { product: any }) => {
  console.log("This is the product from Pricing Component ", product);
  const { id }: any = useParams();
  console.log("params ", id);

  const [productPricing, setProductPricing] = useState<any>([]);
  const { isLoading, isError, error, data }: any = useFetchProductPricing(id);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProductPricing(data.data.data);
      console.log("Product Pricing ", productPricing);
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ShowErrorDialog error={error.message} />;
  }

  return (
    <div>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          We have several powerful plans to best fit your business needs. Choose
          the one which works for you!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {productPricing?.map((price: any) => (
            <Grid
              item
              xs={12}
              md={4}
              key={price.id}
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ShowPriceTable price={price} product={product} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PricingComponent;
