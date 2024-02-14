import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddCardDialog from "./AddCardDialog";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const AddCardBox = styled("div")({
  position: "absolute",
  left: "100px",
  top: "150px",
  border: "3px dashed black",
  borderRadius: 3,
  height: "100px",
  width: "350px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const AddCardDetails = ({ price, productId }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Elements stripe={stripePromise}>
        <AddCardBox onClick={() => setOpen(true)}>
          <Typography variant="h5" sx={{ color: "black" }}>
            Add Card
          </Typography>
        </AddCardBox>
        <AddCardDialog
          handleOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          price={price}
          productId={productId}
        />
      </Elements>
    </>
  );
};

export default AddCardDetails;
