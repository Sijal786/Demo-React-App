import {
  Container,
  Grid,
  Typography,
  Card,
} from "@mui/material";

import { Product } from "../../shared/interfaces/Interface";
import ShowPriceTable from "./ShowPriceTable";

const PricingComponent = ({ pricing, product }: { pricing: any[], product : Product }) => {
 
  console.log("======Product from Pricing", product);
  
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
              }}
            >
            <ShowPriceTable price = { price } productId = {product.id} />
            </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PricingComponent;
