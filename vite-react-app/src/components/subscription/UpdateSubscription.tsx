import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import Stripe from 'stripe';
import { getAPIResult } from '../../services/axios';
import { useEffect } from 'react';
import ShowPriceTable from './ShowPriceTable';
import { Button, Grid, Container, Typography, Card, CardContent, CardActions} from '@mui/material';

const UpdateSubscription = () => {

  const location = useLocation();
  const { state } = location;
  const { subscription } = state;
  console.log("From Update Subscription", subscription)
  console.log("From Update Subscription product id", subscription.plan.product)


  const stripe2 = new Stripe('sk_test_51ObKZ9EVITF2DHVDd0JdpYldyhA0KprTa0SCVDpbYEvYgcmHA2U4D5D1GhNK6Jmkx2KlMJx5AbqJg6AK4bYdfy8N00oYG9nrmT');
  const [pricing, setPricing] = useState([]);
  const [currentPriceIndex, setCurrentPriceIndex] = useState(0);

  
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const priceUrl = `https://api.stripe.com/v1/prices?product=${subscription.plan.product}`;
        const pricingData = await getAPIResult(priceUrl);
        setPricing(pricingData);
        console.log("Pricing Data", pricing);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      }
    };
    fetchPricing();
  }, []);

  console.log("Pricing from update subscription", pricing);

  const handleUpgrade = () => {
    const nextIndex = (currentPriceIndex + 1) % pricing.length;
    setCurrentPriceIndex(nextIndex);
    
  }

  const handleUpdateSubscription = async() => {
    const itemId = subscription.items.data[0].id;
    const currentPriceId = pricing[currentPriceIndex].id;
    console.log("Subscription from handle update Item ", itemId);
    console.log("Subscription from handle update current price" , currentPriceId);

    const updateSubscription = await stripe2?.subscriptions.update(
        subscription.id,
        {
            items: [
                { 
                   id: itemId, 
                   plan: 'price_1OeBioEVITF2DHVDkWavuPGo' 
                }
            ],
        }
    );
    console.log(updateSubscription);
    console.log("The price is updated successfully");

  }

  console.log("Pricing" , pricing)

  console.log("Current Price " , pricing[currentPriceIndex]);
    
  return (
    <>
    <Button variant= "contained"onClick={handleUpgrade}> Upgrade </Button>
    <Button variant= "contained" onClick = {handleUpdateSubscription}> Upadate Price </Button>
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
          {pricing.map((price: any) => (
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
               width : "100%",
               display: "flex",
               flexDirection: "column",
               border: price.id === pricing[currentPriceIndex].id ? '4px solid #0096FF' : 'none'
             }}
           >
             <ShowPriceTable price = {price} productId = {subscription.plan.product} />
           </Card>
         </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default UpdateSubscription