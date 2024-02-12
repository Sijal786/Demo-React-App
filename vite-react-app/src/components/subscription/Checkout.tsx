import { Container, Grid, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import getCustomerCredentialsFromLocalStorage from "../../shared/helper/getCustomerCredentialsFromLocalStorage";
import Stripe from "stripe";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";
import { useEffect } from "react";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";
import { useFetchProductById } from "../../hooks/useFetchProductById";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Stack } from "@mui/system";
import { useCreateSubscription } from "../../hooks/useCreateSubscription";
import ShowAlert from "../../shared/components/ShowAlert";
import ShowDialog from "../../shared/dialogs/ShowDialog";

interface State {
  productId: string;
  price: any;
}

const Checkout = () => {
  const location = useLocation();
  const { state }: { state: State } = location;
  const { price, productId } = state;
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);

  const { customerId, paymentMethod } =
    getCustomerCredentialsFromLocalStorage();
  console.log("Customer Id from Checkout ", customerId);

  const [product, setProduct] = useState<any>({});
  const {
    isLoading: productLoading,
    data: productData,
    error: productError,
    isError: productIsError,
  }: any = useFetchProductById(productId);

  const {
    isLoading: subscriptionLoading,
    data: subscriptionData,
    error: subscriptionError,
    isError: subscriptionIsError,
    mutate: createSubscription,
  }: any = useCreateSubscription();

  useEffect(() => {
    if (!productLoading && !productIsError && productData) {
      setProduct(productData.data);
    }
  }, [productLoading, productIsError, productData]);

  useEffect(() => {
    if (!subscriptionLoading && !subscriptionIsError && subscriptionData) {
      console.log("The subscription is created successfully");
    }
  }, [subscriptionLoading, subscriptionIsError, subscriptionData]);

  if (productLoading || subscriptionLoading) {
    <Loading />;
  } else if (productIsError || subscriptionIsError) {
    return (
      <ShowErrorDialog
        error={productError?.message || subscriptionError?.message}
      />
    );
  }

  const handleSubscribe = async () => {
    const subscriptionData = {
      customer: customerId,
      items: [{ price: price.id }],
      trial_end: "now",
      default_payment_method: paymentMethod,
    };
    console.log("Button is clicked ");
    createSubscription(subscriptionData);
    setSuccessAlert(true);
  };

  const handleAllSubscriptions = () => {
    navigate(Routes.ShowAllSubscriptions);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          {/* Product details */}
          <Typography variant="h4" gutterBottom mt={17}>
            {product?.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product?.description}
          </Typography>
          {product?.images ? (
            <img src={product.images[0]} alt="Product" />
          ) : (
            <p>Loading image...</p>
          )}
          {product?.features?.map((feature: any, index: any) => (
            <Stack direction="row" spacing={1}>
              <CheckCircleIcon sx={{ fontSize: 30, color: "green" }} />
              <Typography key={index} variant="body1">
                {feature.name}
              </Typography>
            </Stack>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} mt={45}>
          {/* Payment form */}
          <Typography variant="h3" gutterBottom mt={4}>
            Payment Details
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ color: "#008000" }}>
            {price?.unit_amount} / {price?.recurring?.interval}
          </Typography>
          <Typography>
            Are you ready to subscribe to this offer? Please click the button
            below.
          </Typography>
          <Button onClick={handleSubscribe}>Subscribe</Button>
          <Button onClick={handleAllSubscriptions}>All Subscriptions</Button>
        </Grid>
      </Grid>
      {successAlert && (
        <ShowAlert
          severity="success"
          content="The subscription is created successfully"
          setSuccessAlert={setSuccessAlert}
        />
      )}
    </Container>
  );
};

export default Checkout;
