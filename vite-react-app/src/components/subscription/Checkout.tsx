import { Container, Grid, Typography, Button } from "@mui/material";
import { Router, useLocation } from "react-router-dom";
import { Product } from "../../shared/interfaces/Interface";
import { loadStripe } from "@stripe/stripe-js";
import getCustomerCredentialsFromLocalStorage from "../../shared/helper/getCustomerCredentialsFromLocalStorage";
import Stripe from "stripe";
import ShowAlllSubscriptions from "./ShowAlllSubscriptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";
import { subscribe } from "diagnostics_channel";


const stripePromise = loadStripe("pk_test_51ObKZ9EVITF2DHVDaMpdNhSHKAaP45uFYEQZv26Dxp8z6Soi50kvaAFKaY7OFnrpifu5EZFRQBXJL23MlvDCadxn00It49ff4c");
const stripe2 = new Stripe('sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT');

interface State {
  productId:string;
  price: any;
}

const Checkout = () => {

  const location = useLocation();
  const { state }: { state: State } = location;
  const { price, productId} = state;
  const [activeComponent, setActiveComponent] = useState("Checkout");
  const navigate = useNavigate();

  console.log("======Product from Checkout", productId);
  console.log("======Pricing from Checkout", price);
  
  const { customerId } = getCustomerCredentialsFromLocalStorage();
  console.log("Customer Id from Checkout ", customerId);

  const handleSubscribe = async () => {
    const subscription = await stripe2?.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: price.id,
        },
      ],
    });
    console.log("----------Subscription" , subscription);
    
    console.log("You have successfully subscribed to this offer");
  }

  const handleAllSubscriptions = () => {
    navigate(Routes.ShowAllSubscriptions);
  }

  return (
    <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom mt={4}>
            Product Details
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              {/* Product details */}
              <Typography variant="h6" gutterBottom>
                {/* {product.name} */}
              </Typography>
              <Typography variant="body1" paragraph>
                {/* {product.description} */}
              </Typography>
              {/* <Typography variant="body1" paragraph>
                {price.unit_amount + "    " + price.currency}
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* Payment form */}
              <Typography variant="h2" gutterBottom mt={4}>
                Payment Details
              </Typography>
              <Typography > 
                Are you ready to subscribe to this offer? Please click the button below.
              </Typography>
              <Button onClick={handleSubscribe}>Subscribe</Button>
              <Button onClick={handleAllSubscriptions}>All Subscriptions</Button>
            </Grid>
          </Grid>
    </Container>
  );
}

export default Checkout;
