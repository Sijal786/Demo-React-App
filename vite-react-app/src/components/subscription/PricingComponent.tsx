import { Container, Grid, Typography, Card } from "@mui/material";
import ShowPriceTable from "./ShowPriceTable";
import { useFetchProductPricing } from "../../hooks/useFetchPricing";
import { useState } from "react";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";
import { useEffect } from "react";

const PricingComponent = ({ productId, product }: { productId: string, product : any }) => {
  const [productPricing, setProductPricing] = useState<any>([]);
  const { isLoading, isError, error, data }: any =
    useFetchProductPricing(productId);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setProductPricing(data.data.data);
      console.log("Product Pricing ", productPricing)
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
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default MUI components with
          little customization.
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
                <ShowPriceTable price={price} product={product} productId={ productId } />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PricingComponent;
