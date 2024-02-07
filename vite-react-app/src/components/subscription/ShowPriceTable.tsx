import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material'; 
import { getAPIResult } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../shared/routes/Routes';
import { useState } from 'react';
import { useEffect } from 'react';


const ShowPriceTable = ({ price , productId} : any ) => {

    const navigate = useNavigate();
    const [pricing , setPricing] = useState([]);

    useEffect(() => {
        const fetchPricing = async () => {
          try {
            const priceUrl = `https://api.stripe.com/v1/prices?product=${productId}`;
            const pricingData = await getAPIResult(priceUrl);
            setPricing(pricingData);
            console.log("Pricing Data", pricing);
          } catch (error) {
            console.error("Error fetching pricing:", error);
          }
        };
    
        fetchPricing();
      }, []);

    const handleSubscribe = async (id : string) => {
    
        // const customerEmail = localStorage.getItem("email");
        // console.log("======Customer Email", customerEmail);
    
        // const url = "https://api.stripe.com/v1/customers";
        // const data = await getAPIResult(url);
    
        // console.log("======Customers", data);
    
        // const matchingCustomer = data.find(
        //   (customer: any) => customer.email == customerEmail
        // );
        // console.log(matchingCustomer);
    
        // const price = pricing.find((price : any) => price.id == id); 
        // console.log("======Price that user wants to subscribe" , price)

        if (!!localStorage.getItem("CustomerID")) {
          navigate(Routes.Checkout, { state: { price, productId } });
          console.log("The customer exist ");
        } else {
          console.log("The customer does not exist");
          navigate(Routes.Register);
        }
      };
    
  return (
    <>
    
              <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom align="center">
                    Pricing
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    align="center"
                    gutterBottom
                  >
                    ${price.unit_amount}
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom>
                    {price.currency} per month
                  </Typography>
                  <Typography variant="body2" align="center">
                    You can explore Pricing here
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubscribe(price.id)}
                  >
                    Subscribe
                  </Button>
                </CardActions>
                </>
             
  )
}

export default ShowPriceTable;