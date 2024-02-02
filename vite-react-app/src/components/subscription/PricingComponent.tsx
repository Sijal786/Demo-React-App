import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";
import { Product } from "../../shared/interfaces/Interface";
import { getAPIResult } from "../../services/axios";

const PricingComponent = ({ pricing, product }: { pricing: any[], product : Product }) => {
  const navigate = useNavigate();
  console.log("======Product from Pricing", product);
  const handleSubscribe = async (id : string) => {
    
    const customerEmail = localStorage.getItem("email");
    console.log("======Customer Email", customerEmail);

    const url = "https://api.stripe.com/v1/customers";
    const data = await getAPIResult(url);

    console.log("======Customers", data);

    const matchingCustomer = data.find(
      (customer: any) => customer.email == customerEmail
    );
    console.log(matchingCustomer);

    const price = pricing.find((price) => price.id == id); 
    console.log("======Price that user wants to subscribe" , price )
    if (!!matchingCustomer) {
      navigate(Routes.Checkout, { state: { product, pricing, matchingCustomer } });
      console.log("The customer exist ");
    } else {
      console.log("The customer does not exist");
      navigate(Routes.Register);
    }
  };

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
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PricingComponent;
