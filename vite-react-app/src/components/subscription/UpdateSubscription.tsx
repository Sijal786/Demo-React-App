import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ShowPriceTable from "./ShowPriceTable";
import { Button, Grid, Container, Typography, Card } from "@mui/material";
import { useFetchProductPricing } from "../../hooks/useFetchPricing";
import { useFetchProductById } from "../../hooks/useFetchProductById";
import { useUpdateSubscriptions } from "../../hooks/useUpdateSubscription";
import ShowAlert from "../../shared/components/ShowAlert";

const UpdateSubscription = () => {
  const location = useLocation();
  const { state } = location;
  const { subscription } = state;
  console.log("From Update Subscription", subscription);
  console.log("From Update Subscription product id", subscription.plan.product);
  const [productPricing, setProductPricing] = useState<any>([]);
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const [currentPlan, setCurrentPlan] = useState("");
  const [product, setProduct] = useState({});
  const itemId = subscription.items.data[0].id;
  const [successAlert, setSuccessAlert] = useState(false);

  const {
    isLoading: pricingLoading,
    isError: pricingError,
    error: pricingErrorData,
    data: pricingData,
  } = useFetchProductPricing(subscription.plan.product);

  const {
    isLoading: productLoading,
    isError: productError,
    error: productErrorData,
    data: productData,
  } = useFetchProductById(subscription.plan.product);

  const {
    isLoading: updateSubscriptionLoading,
    isError: updateSubscriptionError,
    error: updateSubscriptionErrorData,
    data: updateSubscriptionData,
    refetch: updateSubscriptionRefetch,
  } = useUpdateSubscriptions(itemId, currentPlan, subscription.id);

  const handleUpgrade = () => {
    if (productPricing.length > 0) {
      setCurrentPriceIndex(
        (prevCurrentPriceIndex) =>
          (prevCurrentPriceIndex + 1) % productPricing.length
      );
    }
  };

  useEffect(() => {
    if (productPricing.length > 0) {
      console.log("current Index---------------", currentPriceIndex);
      setCurrentPlan(productPricing[currentPriceIndex]?.id);
      console.log("Current Plan", currentPlan);
    }
  }, [productPricing, currentPriceIndex, handleUpgrade]);

  useEffect(() => {
    if (!pricingLoading && !pricingError && pricingData) {
      setProductPricing(pricingData.data.data);
    }
  }, [pricingLoading, pricingError, pricingData]);

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      setProduct(productData.data);
    }
  }, [productLoading, productError, productData]);

  if (productLoading && pricingLoading && updateSubscriptionLoading) {
    return <h2> Loading </h2>;
  }
  if (productError && pricingError) {
    return <h2> Error </h2>;
  }

  const handleUpdateSubscription = async () => {
    updateSubscriptionRefetch();
    console.log(updateSubscriptionData);
    setSuccessAlert(true);
    console.log("The price is updated successfully");
  };

  return (
    <>
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

        <Grid container justifyContent="center" spacing={2} mt={2}>
          <Grid item>
            <Button variant="contained" onClick={handleUpgrade}>
              Upgrade
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleUpdateSubscription}>
              Update Price
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {productPricing?.map((price: any) => (
            <Grid
              item
              key={price.id}
              xs={12}
              md={4}
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border:
                    price?.id === productPricing[currentPriceIndex]?.id
                      ? "4px solid #0096FF"
                      : "none",
                }}
              >
                <ShowPriceTable
                  price={price}
                  product={product}
                  productId={subscription.plan.product}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        {successAlert && (
          <ShowAlert
            severity="success"
            content="The subscription is updated successfully"
            setSuccessAlert={setSuccessAlert}
          />
        )}
      </Container>
    </>
  );
};

export default UpdateSubscription;
