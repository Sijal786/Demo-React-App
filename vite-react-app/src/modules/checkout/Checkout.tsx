import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import getCustomerCredentialsFromLocalStorage from "../../shared/helper/getCustomerCredentialsFromLocalStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../shared/routes/Routes";
import { useEffect } from "react";
import Loading from "../../shared/components/Loading";
import ShowErrorDialog from "../../shared/dialogs/ShowErrorDialog";
import { useCreateSubscription } from "../../services/hooks/useCreateSubscription";
import { useFetchProductById } from "../../services/hooks/useFetchProductById";
import ShowAlert from "../../shared/components/ShowAlert";
import AddCardDetails from "./AddCardDetails";

interface State {
  price: any;
  id: string;
}

const Checkout = () => {
  const location = useLocation();
  const { state }: { state: State } = location;
  const { price, id } = state;
  console.log("Fron Checkout Product Info", id);

  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const { customerId, paymentMethod } =
    getCustomerCredentialsFromLocalStorage();
  console.log("Customer Id from Checkout ", customerId);

  const [product, setProduct] = useState<any>({});
  const {
    isLoading: productLoading,
    data: productData,
    error: productError,
    isError: productIsError,
  }: any = useFetchProductById(id);

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
    if (!!localStorage.getItem("card")) {
      const subscriptionData = {
        customer: customerId,
        items: [{ price: price.id }],
        default_payment_method: paymentMethod,
      };
      console.log("Button is clicked ");
      createSubscription(subscriptionData);
      setSuccessAlert(true);
    } else {
      setErrorAlert(true);
    }
  };

  console.log("Product", product);
  console.log("Price", price);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* First half of the page */}
        <Grid item xs={12} sm={6}>
          <AddCardDetails />
        </Grid>

        {/* Second half of the page */}
        <Grid
          item
          xs={12}
          sm={6}
          border="1px solid #008000"
          mt={12}
          padding={4}
        >
          {/* Payment form */}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" gutterBottom>
              {product?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {"$ " + price?.unit_amount}
            </Typography>
          </Box>
          <hr />
          <Box my={3}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                SubTotal
              </Typography>
              <Typography variant="body1" gutterBottom>
                {"$ " + price?.unit_amount}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                Discount
              </Typography>
              <Typography variant="body1" gutterBottom>
                {"$ " + price?.unit_amount}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" gutterBottom>
                Tax
              </Typography>
              <Typography variant="body1" gutterBottom>
                {"$ " + price?.unit_amount}
              </Typography>
            </Box>
          </Box>
          <hr />
          <Box my={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" gutterBottom>
                Total payable
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "blue", fontWeight: "bold" }}
              >
                {"$ " + price?.unit_amount}
              </Typography>
            </Box>
          </Box>
          <hr />
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleSubscribe}
          >
            {" "}
            Subscribe
          </Button>
        </Grid>
      </Grid>

      {successAlert && (
        <ShowAlert
          severity="success"
          content="The subscription is created successfully"
          setSuccessAlert={setSuccessAlert}
        />
      )}
      {errorAlert && (
        <ShowAlert
          severity="error"
          content="Add your card first to subscribe the offers"
          setSuccessAlert={setSuccessAlert}
        />
      )}
      {/* {subscriptionLoading && <Loading />} */}
    </Container>
  );
};

export default Checkout;
