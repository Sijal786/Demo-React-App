import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Product } from "../../shared/interfaces/Interface";
import { useForm } from "react-hook-form";
import { postAPIResult } from "../../services/axios";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import 

const stripePromise = loadStripe("your_publishable_key");

interface State {
  product: Product;
  price: any;
  matchingCustomer: any;
}

const Checkout = () => {
  const location = useLocation();
  const stripePromise = loadStripe("your_publishable_key");
  const { state }: { state: State } = location;

  // Now you can access the state variables
  const { product, price, matchingCustomer } = state;
  console.log("======Product from Checkout", product);
  console.log("======Pricing from Checkout", price);
  console.log("======Customer from Checkout", matchingCustomer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {

    console.log(data);
    const url = "https://api.stripe.com/v1/payment_methods";
    const postData = new URLSearchParams({
      type: "card",
      "card[number]": data.cardNumber,
      "card[exp_month]": 8,
      "card[cvc]": data.cvc,
      "card[exp_year]": 2026,
    } as any);
    const result = await postAPIResult(url, postData);
    console.log(result);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom mt={4}>
        Product Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          {/* Product details */}
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body1" paragraph>
            {/* {price.unit_amount + "    " + price.currency} */}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Payment form */}
          <Typography variant="h2" gutterBottom mt={4}>
            Payment Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              required
            />
            <TextField
              {...register("cardNumber", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="cardNumber"
              label="Card Number"
              name="cardNumber"
              autoComplete="cc-number"
              required
            />
            <TextField
              {...register("expiry", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="expiry"
              label="Expiry Date"
              name="expiry"
              autoComplete="cc-exp"
              required
            />
            <TextField
              {...register("cvv", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              autoComplete="cc-csc"
              required
            />
            <TextField
              {...register("nameOnCard", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="nameOnCard"
              label="Name on Card"
              name="nameOnCard"
              autoComplete="name"
              required
            />
            <TextField
              {...register("country", { required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="country"
              label="Country or Region"
              name="country"
              autoComplete="country"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Pay Now
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
