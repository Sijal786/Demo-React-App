import {
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../shared/routes/Routes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Stack } from "@mui/system";

const ShowPriceTable = ({ price, product }: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("Price from Show Price Table ", price);
  console.log("Product from Show Price Table ", product);

  const handleSubscribe = async () => {
    {
      console.log("handeSubscribe id ", id);
      navigate(Routes.Checkout, { state: { price, id } });
      console.log("The customer exist ");
      console.log("from Subscribe Product", product);
    }
  };

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom mt={3}>
        {product?.name}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        gutterBottom
        mt={2}
      >
        {product?.description}
      </Typography>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          {price.currency == "usd" ? "$" : price.currency} {price.unit_amount} /{" "}
          {price.recurring.interval}
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item></Grid>
          <Grid item>
            {product?.features?.map((feature: any, index: any) => (
              <Stack direction="row" spacing={1}>
                <CheckCircleIcon sx={{ fontSize: 30, color: "green" }} />
                <Typography key={index} variant="body1">
                  {feature.name}
                </Typography>
              </Stack>
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", marginBottom: "10px" }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleSubscribe()}
        >
          Subscribe
        </Button>
      </CardActions>
      <br />
    </>
  );
};

export default ShowPriceTable;
