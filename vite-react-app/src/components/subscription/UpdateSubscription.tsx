import { useState } from "react";
import { useLocation } from "react-router-dom";
import Stripe from "stripe";
import { useEffect } from "react";
import ShowPriceTable from "./ShowPriceTable";
import { Button, Grid, Container, Typography, Card } from "@mui/material";
import { useFetchProductPricing } from "../../hooks/useFetchPricing";
import { useFetchProductById } from "../../hooks/useFetchProductById";
import ShowAlert from "../../shared/components/ShowAlert";

const UpdateSubscription = () => {
  const location = useLocation();
  const { state } = location;
  const { subscription } = state;
  console.log("From Update Subscription", subscription);
  console.log("From Update Subscription product id", subscription.plan.product);
  const [productPricing, setProductPricing] = useState<any>([]);
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);
  const [product, setProduct] = useState({});

  const stripe2 = new Stripe(
    "sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT"
  );

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

  useEffect(() => {
    if (!pricingLoading && !pricingError && pricingData) {
      setProductPricing(pricingData.data.data);
      console.log("Product Pricing from upgrade ", pricingData.data.data);
    }
  }, [pricingLoading, pricingError, pricingData]);

  useEffect(() => {
    if (!productLoading && !productError && productData) {
      setProduct(productData.data);
      console.log("Product from upgrade ", productData.data);
    }
  }, [productLoading, productError, productData]);

  useEffect(() => {
    if (productPricing.length > 0) {
      setCurrentPriceIndex(0);
    }
  }, [productPricing, product]);

  console.log("Pricing from update subscription", productPricing);

  const handleUpgrade = () => {
    const nextIndex = (currentPriceIndex + 1) % productPricing.length;
    setCurrentPriceIndex(nextIndex);
  };

  const handleUpdateSubscription = async () => {
    const itemId = subscription.items.data[0].id;
    const currentPriceId = productPricing[currentPriceIndex].id;
    console.log("Subscription from handle update Item ", itemId);
    console.log(
      "Subscription from handle update current price",
      currentPriceId
    );

    const updateSubscription = await stripe2?.subscriptions.update(
      subscription.id,
      {
        items: [
          {
            id: itemId,
            plan: productPricing[currentPriceIndex].id,
          },
        ],
      }
    );
    console.log(updateSubscription);
    console.log("The price is updated successfully");
    return <ShowAlert severity = "success" content = "The subscription is updated successfully" />
  };

  console.log("Current Price ", productPricing[currentPriceIndex]);
  console.log("Product from Update Snscription", product);

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
      </Container>
    </>
  );
};

export default UpdateSubscription;
