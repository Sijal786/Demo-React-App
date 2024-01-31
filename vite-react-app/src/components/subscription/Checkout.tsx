import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';

const Checkout = () => {
  const handleSubmit = (e : any) => {
    e.preventDefault();
    // Handle payment submission
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          {/* Product details */}
          <Typography variant="h6" gutterBottom>
            Product Name
          </Typography>
          <Typography variant="body1" paragraph>
            Product description goes here...
          </Typography>
          {/* Add more product details as needed */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Payment form */}
          <Typography variant="h4" gutterBottom>
            Payment Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
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
              variant="outlined"
              margin="normal"
              fullWidth
              id="cvv"
              label="CVV"
              name="cvv"
              autoComplete="cc-csc"
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
